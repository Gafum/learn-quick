import { wordData } from "../../Types_temp/interfaces";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import styles from "./TestScreen.module.scss";
import createAnswer from "./MyFunctions/CreateAnswer";
import OneTest from "./OneTest/OneTest";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../JotaiData_temp/jotaiData";



interface ItestScreenComponenprops {
   myIterableList: wordData[];
   isFinished: boolean;
   score: number;
   testNumber: number;
   startTest: () => void;
   nextTest: (isRight: boolean) => void;
}

function TestScreenComponent({
   myIterableList,
   isFinished,
   score,
   testNumber,
   startTest,
   nextTest
}: ItestScreenComponenprops): JSX.Element {

   const { tests: testsSettings } = useAtomValue(settingsDataConst);

   //Loading
   if (myIterableList.length == 0) {
      return (
         <div className={styles.testScreen}>
            Loading...
         </div>
      )
   }

   if (isFinished) {
      return (
         <div className={styles.testScreen}>
            <h3>Yor score: {score}/{testNumber + 1}</h3>
            <CustomBtn onClick={startTest}>
               Repeat
            </CustomBtn>
         </div>
      )
   }

   return (
      <div className={styles.testScreen}>
         <OneTest
            wordData={myIterableList[testNumber]}
            nextTest={nextTest}
            createdList={
               createAnswer(
                  myIterableList[testNumber].id,
                  myIterableList,
                  testsSettings.whatAsk.data
               )
            }
         />
      </div>
   );
}

export default TestScreenComponent;
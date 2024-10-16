import { IWordData } from "../../Types/interfaces";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import styles from "./TestScreen.module.scss";
import createAnswer from "./MyFunctions/CreateAnswer";
import OneTest from "./OneTest/OneTest";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../JotaiData/jotaiData";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";
import { createClasses } from "../../Function/createClasses";
import useHandleKeyDown from "../../Hooks/useHandleKeyDown";


interface ItestScreenComponenprops {
   myIterableList: IWordData[];
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

   useHandleKeyDown({
      callback: (event: KeyboardEvent) => {

         // Close score page with Enter
         if (!isFinished || myIterableList.length == 0) return;
         if (event.key === "Enter") {
            startTest()
         }

      },
      dependencyList: [isFinished]
   })

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
         <div className={createClasses([styles.testScreen, styles.resultInTest])}>
            <h3>Yor score: {score}/{testNumber + 1}</h3>
            <CustomBtn onClick={startTest}>
               Repeat
            </CustomBtn>
         </div>
      )
   }

   return (<LazyMotion features={domAnimation}>
      <m.div
         style={{ height: "100%" }}
         className={styles.testScreen}
         {...ScreensAnimation}>
         <OneTest
            oneWordData={myIterableList[testNumber]}
            nextTest={nextTest}
            createdWrongListList={
               createAnswer(
                  myIterableList[testNumber].id,
                  myIterableList,
                  testsSettings.whatAsk.data
               )
            }
         />
      </m.div>
   </LazyMotion>
   );
}

export default TestScreenComponent;
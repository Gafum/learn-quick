import { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import CustomInput, { useCustomInput } from "../../UI/CustomInput/CustomInput";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import styles from "./WritingScreen.module.scss";
import styles1 from "../TestScreen/TestScreen.module.scss";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../JotaiData/jotaiData";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { oneStyleString } from "../../Function/oneStyleString";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";
import MistakeDialog from "./Dialogs/MistakeDialog";
import useHandleKeyDown from "../../Hooks/useHandleKeyDown";


function WritingScreen(): JSX.Element {
   const {
      isLoading,
      myIterableList,
      resetData,
      reduceRate,
      setNewParamInTopicData
   } = useTestData()

   //Settings Data
   const { writing: writingSettings } = useAtomValue(settingsDataConst)
   const whatAsk = writingSettings.whatAsk.data
   const showQuestion = writingSettings.showQuestion.data;

   //Data for imported Component
   const [showModule, setShowModule] = useState(false)
   const [value, setValue] = useCustomInput("")

   //Data for test
   const [score, setScore] = useState(0)
   const [testNumber, setTestNumber] = useState(0)

   useHandleKeyDown({
      callback: (event: KeyboardEvent) => {
         if (!showModule) return;
         if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Enter will not work with input

            //Reset Data in Writing Screen
            resetData()
            setTestNumber(0)
            setScore(0)
            setValue("")
            setShowModule(false)
         }
      },
      dependencyList: [showModule, setShowModule]
   })

   //Reset Data when Module closed 
   useEffect(() => {
      if (!showModule && !isLoading) {
         resetData()
         setTestNumber(0)
         setScore(0)
         setValue("");
      }
   }, [showModule, isLoading])

   //Is answer right?
   function checkAnswer() {
      //find right answer
      let text2 = oneStyleString(whatAsk ? myIterableList[testNumber].meaning : myIterableList[testNumber].word)

      //check user Answer
      return oneStyleString(value) == text2
   }

   function nextQuestion(event: React.FormEvent) {
      event?.preventDefault();

      if (checkAnswer()) {
         //Right Answer
         reduceRate(myIterableList[testNumber].id);
         setScore(prev => prev + 1)
         setTestNumber((prev) => {
            if (prev >= myIterableList.length - 1) {
               resetData();
               return 0;
            }
            return prev + 1;
         });
         setValue("");
      } else {
         //Mistake

         setNewParamInTopicData({
            id: myIterableList[testNumber].id,
            param: "rate",
            newData: 5,
         })
         setShowModule(true)
      }
   }

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>
   }

   return (<LazyMotion features={domAnimation}>
      <m.div
         style={{ height: "100%" }}
         className={styles.writingScreen}
         {...ScreensAnimation}
      >

         <div className={styles1.questionComponent}>
            {showQuestion && <ImgTag src={myIterableList[testNumber].img} />}
            <h3>
               {whatAsk ? myIterableList[testNumber].word : myIterableList[testNumber].meaning}
            </h3>
         </div>

         <form onSubmit={showModule ? () => { } : nextQuestion}>
            <CustomInput
               hint={"Write Answer"}
               value={value}
               setValue={
                  (event) => {
                     if (showModule) return;
                     setValue(event)
                  }
               }
               updateFocuseData={showModule} />
            <CustomBtn>Check</CustomBtn>
         </form>

      </m.div>

      <MistakeDialog
         title="Mistake"
         show={showModule}
         setShow={setShowModule}
         score={score}
         word={myIterableList[testNumber].word}
         meaning={myIterableList[testNumber].meaning}
      />

   </LazyMotion>
   );
}

export default WritingScreen;
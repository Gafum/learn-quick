import { useCallback, useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import CustomInput, { useCustomInput } from "../../UI/CustomInput/CustomInput";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import styles from "./WritingScreen.module.scss";
import styles1 from "../TestScreen/TestScreen.module.scss";
import { useAtomValue } from "jotai";
import { settingsDataConst } from "../../JotaiData/jotaiData";
import CustomDialog from "../../UI/CustomDialog/CustomDialog";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { oneStyleString } from "../../Function/oneStyleString";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";


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


   //Is answer right?
   function checkAnswer() {
      let text2 = oneStyleString(whatAsk ? myIterableList[testNumber].meaning : myIterableList[testNumber].word)

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

   //Reset Data when Module closed 
   useEffect(() => {
      if (!showModule && !isLoading) {
         resetData()
         setTestNumber(0)
         setScore(0)
         setValue("");
      }
   }, [showModule, isLoading])

   // keybord Events
   const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (!showModule) return;
      if (event.key === "Enter" || event.key === " ") {
         resetData()
         setTestNumber(0)
         setScore(0)
         setValue("");
         setShowModule(false)
      }

   }, [showModule, setShowModule]);

   // add and remove keybord event handler
   useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [handleKeyDown]);


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

         <form onSubmit={nextQuestion}>
            <CustomInput hint={"Write Answer"} value={value} setValue={setValue} />
            <CustomBtn>Check</CustomBtn>
         </form>

      </m.div>
      <CustomDialog show={showModule}
         setShow={setShowModule}
         title="Mistake"
      >
         <div className={styles.writingDialog}>
            <h3>
               <span className={styles.wordTitle}>
                  {myIterableList[testNumber].word}
               </span>
               <br /> = <br />
               <span className={styles.meaningTitle}>
                  {myIterableList[testNumber].meaning}
               </span>
            </h3>
            <p>Your Score is {score} right answers</p>
            <CustomBtn onClick={() => setShowModule(false)}>
               Repeat
            </CustomBtn>
         </div>
      </CustomDialog>
   </LazyMotion>
   );
}

export default WritingScreen;
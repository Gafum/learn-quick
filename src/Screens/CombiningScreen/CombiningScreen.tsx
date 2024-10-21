import { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import styles from "./CombiningScreen.module.scss";
import { IWordData, NumStr } from "../../Types/interfaces";
import { shuffleArray } from "../../Function/shufleArray";
import { createClasses } from "../../Function/createClasses";
import { findIndexOfELement } from "../../Function/findElementByID";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { motion, AnimatePresence } from "framer-motion"
import { ScreensAnimation } from "../../CustomData/animation";

interface IWordDataCombiningScreen extends IWordData {
   wrongAnswer?: boolean;
}

function CombiningScreen(): JSX.Element {
   const { myIterableList } = useTestData()
   const [leftSideList, setLeftSideList] = useState<IWordDataCombiningScreen[]>([])
   const [rightSideList, setRightSideList] = useState<IWordDataCombiningScreen[]>([])
   const [selectedElement, setSelectedElement] = useState<NumStr>(-1);

   useEffect(() => {
      startTest()
   }, [myIterableList])

   function startTest() {
      setRightSideList(
         shuffleArray([...myIterableList]).slice(0, 15)
      )
      setLeftSideList(
         shuffleArray([...myIterableList]).slice(0, 15)
      )
   }

   function selectFirstElem(elementId: NumStr) {
      setSelectedElement(elementId)
      setRightSideList(prev => removeWrongAnswer(prev))
   }

   function removeWrongAnswer(localList: IWordDataCombiningScreen[]) {
      //Remove wrongAnswer parameter in list

      return localList.map((elem) => {
         return { ...elem, ...{ wrongAnswer: false } }
      });
   }

   function checkAnswer(choosedElement: NumStr) {
      function removeChoosedElement(prev: IWordDataCombiningScreen[]) {
         let localList: IWordData[] = JSON.parse(JSON.stringify(prev))
         localList.splice(findIndexOfELement(localList, choosedElement), 1)
         return removeWrongAnswer(localList);
      }

      if (selectedElement == -1) return;

      if (choosedElement == selectedElement) {
         setRightSideList(removeChoosedElement)
         setLeftSideList(removeChoosedElement)
         setSelectedElement(-1)
      } else {
         setRightSideList(prev => {
            let localList: IWordDataCombiningScreen[] = JSON.parse(JSON.stringify(prev))
            localList[findIndexOfELement(localList, choosedElement)].wrongAnswer = true;
            return localList;
         })
      }
   }

   //Loading
   if (myIterableList.length == 0) {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            Loading...
         </div>
      )
   }

   //Restart Test
   if (leftSideList.length == 0) {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <CustomBtn onClick={startTest}>
               Repeate Test
            </CustomBtn>
         </div>
      )
   }

   return (
      <motion.div
         {...ScreensAnimation}
         className={styles.combiningScreen}
      >

         <div className={styles.leftSide}
         >
            <AnimatePresence initial={false}>
               {
                  leftSideList.map(
                     (elem) => {
                        return (
                           <motion.div
                              layout
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className={styles.animatedBock}
                              key={elem.id + "left"}
                           >
                              <button
                                 onClick={() => selectFirstElem(elem.id)}
                                 className={
                                    createClasses([
                                       styles.oneBlock,
                                       selectedElement == elem.id && styles.selectedElement
                                    ])}>
                                 {elem.word}
                              </button>
                           </motion.div>
                        )
                     }
                  )
               }
            </AnimatePresence>
         </div>

         <div className={styles.rightSide}>
            <AnimatePresence initial={false}>
               {
                  rightSideList.map((elem) => {
                     return (
                        <motion.div
                           layout
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.2 }}
                           className={styles.animatedBock}
                           key={elem.id + "right"}
                        >
                           <button
                              className={
                                 createClasses([
                                    styles.oneBlock,
                                    elem.wrongAnswer ? styles.wrongAnswer : "",
                                 ])
                              }
                              onClick={() => checkAnswer(elem.id)}
                           >
                              {elem.meaning}
                           </button>
                        </motion.div>
                     )
                  })
               }
            </AnimatePresence>
         </div>

      </motion.div >
   );
}

export default CombiningScreen;
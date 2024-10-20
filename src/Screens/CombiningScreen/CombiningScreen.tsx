import { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import styles from "./CombiningScreen.module.scss";
import { IWordData, NumStr } from "../../Types/interfaces";
import { shuffleArray } from "../../Function/shufleArray";
import { createClasses } from "../../Function/createClasses";
import { findIndexOfELement } from "../../Function/findElementByID";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { m, LazyMotion, domAnimation } from "framer-motion"
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
         shuffleArray([...myIterableList])
      )
      setLeftSideList(
         shuffleArray([...myIterableList])
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
      <LazyMotion features={domAnimation}>
         <m.div
            {...ScreensAnimation}
            className={styles.combiningScreen}
         >
            <div className={styles.leftSide}>
               {
                  leftSideList.map((elem) => {
                     return (
                        <button
                           onClick={() => selectFirstElem(elem.id)}
                           key={elem.id + "left"}
                           className={
                              createClasses([
                                 styles.oneBlock,
                                 selectedElement == elem.id && styles.selectedElement
                              ])}>
                           {elem.word}
                        </button>
                     )
                  })
               }
            </div>

            <div className={styles.rightSide}>
               {
                  rightSideList.map((elem) => {
                     return (
                        <button
                           key={elem.id + "right"}
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
                     )
                  })
               }
            </div>
         </m.div>
      </LazyMotion>
   );
}

export default CombiningScreen;
import React, { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import styles from "./CombiningScreen.module.scss";
import { IWordData, NumStr } from "../../Types/interfaces";
import { shuffleArray } from "../../Function/shufleArray";
import { createClasses } from "../../Function/createClasses";
import { findIndexOfELement } from "../../Function/findElementByID";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";

function CombiningScreen(): JSX.Element {
   const { myIterableList } = useTestData()
   const [leftSideList, setLeftSideList] = useState<IWordData[]>([])
   const [rightSideList, setRightSideList] = useState<IWordData[]>([])
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

   function checkAnswer(event: React.MouseEvent, choosedElement: NumStr) {
      function removeChoosedElement(prev: IWordData[]) {
         let localList: IWordData[] = JSON.parse(JSON.stringify(prev))
         localList.splice(findIndexOfELement(localList, choosedElement), 1)
         return localList;
      }

      if (selectedElement == -1) return;

      if (choosedElement == selectedElement) {
         setRightSideList(removeChoosedElement)
         setLeftSideList(removeChoosedElement)
         setSelectedElement(-1)
      } else {
         (event.currentTarget as HTMLButtonElement).style.backgroundColor = "red"
      }
   }

   if (myIterableList.length == 0) {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            Loading...
         </div>
      )
   }

   if (leftSideList.length == 0) {
      return (<div style={{ display: "flex", justifyContent: "center" }}>
         <CustomBtn onClick={startTest}>
            Repeate Test
         </CustomBtn>
      </div>)
   }

   return (
      <div className={styles.combiningScreen}>
         <div className={styles.leftSide}>
            {
               leftSideList.map((elem) => {
                  return (
                     <button
                        onClick={() => setSelectedElement(elem.id)}
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
                        className={styles.oneBlock}
                        onClick={(event) => checkAnswer(event, elem.id)}
                     >
                        {elem.meaning}
                     </button>
                  )
               })
            }
         </div>
      </div>
   );
}

export default CombiningScreen;
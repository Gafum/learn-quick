import { useEffect, useState } from "react";
import useTestData from "../../Hooks/useTestData";
import styles from "./CombiningScreen.module.scss";
import { IWordData } from "../../Types/interfaces";
import { shuffleArray } from "../../Function/shufleArray";

function CombiningScreen(): JSX.Element {
   const { myIterableList } = useTestData()
   const [chooseList, setChooseList] = useState<IWordData[]>([])


   function startTest() {
      setChooseList(
         shuffleArray([...myIterableList])
      )
   }

   useEffect(() => {
      startTest()
   }, [myIterableList])

   return (
      <div className={styles.combiningScreen}>
         <div className={styles.leftSide}>
            {
               myIterableList.map((elem) => {
                  return (
                     <button key={elem.id + "left"} className={styles.oneBlock}>
                        {elem.word}
                     </button>
                  )
               })
            }
         </div>

         <div className={styles.rightSide}>
            {
               chooseList.map((elem) => {
                  return (
                     <button key={elem.id + "right"} className={styles.oneBlock}>
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
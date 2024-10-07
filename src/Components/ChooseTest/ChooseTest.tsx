import { useNavigate } from "react-router-dom";
import styles from "./ChooseTest.module.scss";
import { useAtomValue } from "jotai/react";
import { topicsData } from "../../JotaiData/jotaiData";
import { createClasses } from "../../Function/createClasses";
import { useMemo } from "react";
import { findElemByID } from "../../Function/findElementByID";

const testTypes: { text: string, link: string }[] = [
   {
      text: "Flashcards",
      link: "flashcards",
   },
   {
      text: "Test",
      link: "test",
   },
   {
      text: "Writing",
      link: "writing",
   },
   // {
   //    text: "Combining",
   //    link: "combining",
   // },
]

function ChooseTest({ sectionId }: { sectionId: string | undefined }): JSX.Element {
   const navigate = useNavigate();

   const alltopicsData = useAtomValue(topicsData)

   const listIsEmpty = useMemo(
      () => {
         if (!sectionId) { return true }
         if (alltopicsData.length == 0) {
            return true
         }
         return findElemByID(alltopicsData, sectionId).data.length <= 0;
      },
      [alltopicsData, sectionId])

   function toggleChoose(event: React.MouseEvent) {
      event.preventDefault()
      event.currentTarget.closest("." + styles.chooseTest)?.classList.toggle(styles.show)
   }

   return (
      <div className={styles.chooseTest}>
         <button className={styles.openListBtn} onClick={toggleChoose}>
            <div className={styles.animateComponent}>
               <span></span>
            </div>
         </button>
         <ul className={styles.chooseTestList} style={{ gridTemplateColumns: `repeat(${testTypes.length}, 1fr)` }}>
            <div className={styles.invisibleBlock} />
            {
               testTypes.map(({ text, link }) => {
                  return (

                     <li
                        onClick={() => { if (!listIsEmpty) navigate(`/${link}/${sectionId}`) }}
                        className={createClasses([
                           styles.testType,
                           listIsEmpty ? styles.disabled : styles.hasElements
                        ])}
                        key={link.toString()} >
                        {text}
                     </li>
                  )
               })
            }
         </ul >
      </div>
   )

}

export default ChooseTest;

import { useNavigate, useParams } from "react-router-dom";
import styles from "./ChooseTest.module.scss";
import { useAtomValue } from "jotai/react";
import { topicsData } from "../../jotaiData/jotaiData";
import { createClasses } from "../../function/createClasses";
import { useMemo } from "react";
import { findElemByID } from "../../function/findElementByID";

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

function ChooseTest(): JSX.Element {
   let { sectionId } = useParams();
   const navigate = useNavigate();

   const alltopicsData = useAtomValue(topicsData)

   const listIsEmpty = useMemo(
      () => {
         if (!sectionId) { return true }

         return findElemByID(alltopicsData, sectionId).data.length <= 0;
      },
      [alltopicsData, sectionId])

   return (
      <ul className={styles.chooseTest} style={{ gridTemplateColumns: `repeat(${testTypes.length}, 1fr)` }}>
         {testTypes.map(({ text, link }) => {
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
         })}
      </ul >
   );
}

export default ChooseTest;

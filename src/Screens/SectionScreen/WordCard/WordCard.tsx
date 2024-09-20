import { useEffect, useRef } from "react";
import { NumStr, wordData } from "../../../Types/interfaces";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import styles from "./WordCard.module.scss";

interface IwordCardProps extends wordData {
   editElement: (id: NumStr) => void;
}

function WordCard({ id, word, meaning, img, editElement }: IwordCardProps): JSX.Element {
   const descRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if (descRef.current) {
         if (descRef.current.offsetHeight > 80) {
            descRef.current.classList.add(styles.bigDescription);
            descRef.current.parentElement?.style.setProperty("--desc-height", "0px");
         }
      }
   }, [img, meaning]);

   function editCard() {
      editElement(id);
   }

   return (
      <div className={styles.wordCard} onClick={editCard}>
         <ImgTag src={img} alt={word} className={styles.wordsImg} />
         <div className={styles.wordDescription} ref={descRef}>
            <h4 className={styles.word}>{word}</h4>
            <p className={styles.meaning}>{meaning}</p>
         </div>
         <button className={styles.editBtn}>
            <ImgTag src="/edit.svg" />
         </button>

      </div>
   );
}

export default WordCard;
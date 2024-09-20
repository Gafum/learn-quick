import { Link } from "react-router-dom";
import { topicData } from "../../../Types_temp/interfaces";
import styles from "./Card.module.scss"
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import React from "react";

interface ICardProps {
   data: topicData;
   editCard: (event: React.MouseEvent) => void
}

function Card({ data, editCard }: ICardProps): JSX.Element {

   return (
      <Link to={`/section/${data.id}`}>
         <div className={styles.card}>
            <ImgTag src={`/${data.icon}.svg`} className={styles.sectionImg} />
            <span className={styles.sectionName}>{data.name}</span>
            <button onClick={editCard} className={styles.editBtn} >
               <ImgTag src="/edit.svg" />
            </button>
         </div>

      </Link>
   );
}

export default Card;
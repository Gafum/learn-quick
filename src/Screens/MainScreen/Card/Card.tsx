import { Link } from "react-router-dom";
import { ITopicData } from "../../../Types/interfaces";
import styles from "./Card.module.scss"
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import React from "react";
import { motion } from "framer-motion";

interface ICardProps {
   data: ITopicData;
   editCard: (event: React.MouseEvent) => void
}

function Card({ data, editCard }: ICardProps): JSX.Element {

   return (
      <motion.div
         layout
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
      >
         <Link to={`/section/${data.id}`}>
            <div className={styles.card}>
               <ImgTag src={`/${data.icon}.svg`} className={styles.sectionImg} />
               <span className={styles.sectionName}>{data.name}</span>
               <button onClick={editCard} className={styles.editBtn} >
                  <ImgTag src="/edit.svg" />
               </button>
            </div>
         </Link>
      </motion.div>
   );
}

export default Card;
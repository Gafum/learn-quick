import { Link } from "react-router-dom";
import { topicData } from "../../../types/interfaces";
import styles from "./Card.module.scss"
import ImgTag from "../../../UI/CustomImage/CustomImageTag";

function Card({ data }: { data: topicData }): JSX.Element {

   return (
      <Link to={`/section/${data.id}`}>
         <div className={styles.card}>
            <ImgTag src={`/${data.icon}.svg`} />
            <span>{data.name}</span>
         </div>
      </Link>
   );
}

export default Card;
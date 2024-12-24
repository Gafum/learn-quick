import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import styles from "./DataNotFound.module.scss";

interface IDataNotFondProps {
   text: string;
   btnText: string;
   callback: (event: React.MouseEvent) => void;
}

function DataNotFound({
   text,
   btnText,
   callback,
}: IDataNotFondProps): JSX.Element {
   return (
      <div className={styles.dataNotFound}>
         <h2>Sorry...</h2>
         <p>{text}</p>
         <CustomBtn onClick={callback}>{btnText}</CustomBtn>
      </div>
   );
}

export default DataNotFound;

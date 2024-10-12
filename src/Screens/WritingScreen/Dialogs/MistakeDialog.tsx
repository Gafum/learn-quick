import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import styles from "./MistakeDialog.module.scss";

interface MistakeDialog extends ICustomDialogProps {
   score: number;
   meaning: string;
   word: string
}

function MistakeDialog(
   {
      title,
      show: showModule,
      setShow: setShowModule,
      score,
      word,
      meaning,
   }:
      MistakeDialog): JSX.Element {

   return (
      <CustomDialog show={showModule}
         setShow={setShowModule}
         title={title}
      >
         <div className={styles.writingDialog}>
            <h3>
               <span className={styles.wordTitle}>
                  {word}
               </span>
               <br /> = <br />
               <span className={styles.meaningTitle}>
                  {meaning}
               </span>
            </h3>
            <p>Your Score is {score} right answers</p>
            <CustomBtn onClick={() => setShowModule(false)}>
               Repeat
            </CustomBtn>
         </div>
      </CustomDialog>);
}

export default MistakeDialog;
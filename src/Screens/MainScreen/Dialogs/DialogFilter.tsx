import ChooseFilter from "../../../Components/ChooseFilter/ChooseFilter";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import styles from "../MainScreen.module.scss";

function DialogFilter({
   show,
   setShow,
   title,
}: ICustomDialogProps): JSX.Element {

   return (
      <CustomDialog setShow={setShow} show={show} title={title}>
         <div className={styles.dialogFilter}>
            <ChooseFilter />

            <CustomBtn onClick={() => setShow(false)}>
               Ok
            </CustomBtn>
         </div>

      </CustomDialog >
   );
}

export default DialogFilter;
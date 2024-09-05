import ChooseFilter from "../../../Components/ChooseFilter/ChooseFilter";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";


function DialogFilter({
   show,
   setShow,
   title,
}: ICustomDialogProps): JSX.Element {

   return (
      <CustomDialog setShow={setShow} show={show} title={title}>
         <form onSubmit={() => console.log("sdas")
         }>
            <ChooseFilter />

            <CustomBtn>
               Ok
            </CustomBtn>
         </form>
      </CustomDialog>
   );
}

export default DialogFilter;
import { ChangeEvent, useState } from "react";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import styles from "../MainScreen.module.scss";

function DialogFilter({
   show,
   setShow,
   title,
}: ICustomDialogProps): JSX.Element {
   const [selectedOption, setSelectedOption] = useState('');

   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.currentTarget.value);
      console.log(`Selected filter: ${event.currentTarget.value}`);
   };
   return (
      <CustomDialog setShow={setShow} show={show} title={title}>
         <form onSubmit={() => console.log("sdas")
         }>

            <div className={styles.radioContainer}>
               <label className={styles.label}>
                  <input
                     type="radio"
                     name="filter"
                     value="name"
                     checked={selectedOption === 'name'}
                     onChange={handleOptionChange}
                     className={styles.radioInput}
                  />
                  Name
               </label>

               <label className={styles.label}>
                  <input
                     type="radio"
                     name="filter"
                     value="length"
                     checked={selectedOption === 'length'}
                     onChange={handleOptionChange}
                     className={styles.radioInput}
                  />
                  Length
               </label>

               <label className={styles.label}>
                  <input
                     type="radio"
                     name="filter"
                     value="id"
                     checked={selectedOption === 'date'}
                     onChange={handleOptionChange}
                     className={styles.radioInput}
                  />
                  Date
               </label>

               <label className={styles.label}>
                  <input
                     type="radio"
                     name="filter"
                     value="icon"
                     checked={selectedOption === 'groups'}
                     onChange={handleOptionChange}
                     className={styles.radioInput}
                  />
                  Groups
               </label>
            </div>

            <CustomBtn>
               Save
            </CustomBtn>
         </form>
      </CustomDialog>
   );
}

export default DialogFilter;
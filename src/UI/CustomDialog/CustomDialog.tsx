import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import styles from "./CustomDialog.module.scss";
import { createClasses } from "../../function/createClasses";


export interface ICustomDialogProps {
   children?: React.ReactNode;
   show: boolean | Dispatch<SetStateAction<boolean>>;
   setShow: Dispatch<SetStateAction<boolean>>;
   title: string;
}

interface ICustomHookDialogReturn<T> {
   show: boolean | Dispatch<SetStateAction<boolean>>;
   setShow: Dispatch<SetStateAction<boolean>>;
   myData: T;
   setMyData: Dispatch<SetStateAction<T>>
}

export function useCustomDialog<T>(data: T): ICustomHookDialogReturn<T> {
   const [show, setShow] = useState<boolean>(false);
   const [myData, setMyData] = useState<T>(data);
   return ({
      show,
      setShow,
      myData,
      setMyData
   });
}

function CustomDialog({ children, show, setShow, title }: ICustomDialogProps): JSX.Element {

   useEffect(() => {
      if (show) {
         document.querySelector("body")!.style.overflow = "hidden";
      } else {
         document.querySelector("body")!.style.overflow = "auto";
      }
   }
      , [show])

   return (
      <div className={createClasses([styles.dialog, show ? "" : styles.hide])}
         onClick={() => setShow(false)}
      >

         <div className={styles.dialogConteiner} onClick={
            (event: MouseEvent) => event.stopPropagation()
         }>
            <div className={styles.titleComponent}>
               <h4>{title}</h4>

               <button className={styles.closeBtn} onClick={() => setShow(false)}>
                  <svg width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <circle cx="13" cy="13" r="15" transform="matrix(-1 0 0 1 30 4)" stroke="white" strokeWidth="3" />
                     <path d="M24 20.6569L20.6569 17.3137L24 13.9706C24.9105 13.0601 24.9105 11.5379 24 10.6274C23.0896 9.717 21.5673 9.717 20.6569 10.6274L17.3731 14.0299L13.9706 10.6274C13.0601 9.717 11.5379 9.717 10.6274 10.6274C9.71699 11.5379 9.71699 13.0601 10.6274 13.9706L14.0893 17.3137L10.6274 20.6569C9.71699 21.5673 9.71699 23.0896 10.6274 24C11.5379 24.9105 13.0601 24.9105 13.9706 24L17.3731 20.5975L20.6569 24C21.5673 24.9105 23.0896 24.9105 24 24C24.9105 23.0896 24.9105 21.5673 24 20.6569Z" fill="white" />
                  </svg>
               </button>
            </div>
            <div className={styles.dialogContent}>
               {children}
            </div>
         </div>
      </div>
   );
}

export default CustomDialog;
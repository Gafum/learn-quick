import { MouseEvent, ReactNode } from "react";
import styles from "./CustomBtn.module.scss";
import { createClasses } from "../../Function/createClasses";

interface IbtnProps {
   children: ReactNode | string;
   onClick?: (event: MouseEvent) => void;
   className?: string;
}


function CustomBtn({ children, onClick, className = "" }: IbtnProps): JSX.Element {

   function doThis(event: MouseEvent) {
      event.stopPropagation()
      if (!onClick) return;
      onClick(event)
   }

   return (
      <button onClick={doThis} className={createClasses([styles.customBtn, className])}>
         {children}
      </button>
   );
}

export default CustomBtn;
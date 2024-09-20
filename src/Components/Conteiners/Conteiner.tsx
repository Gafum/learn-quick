import { NumStr } from "../../Types_temp/interfaces";
import styles from "./Conteiner.module.scss";

export interface IcontainerProps {
   children: React.ReactNode;
   newPadding?: { l?: NumStr, r?: NumStr, t?: NumStr, b?: NumStr };
   hasMaxWidth?: boolean;
}

function Conteiner(
   { children, newPadding, hasMaxWidth = true }: IcontainerProps
): JSX.Element {

   return (
      <div
         className={styles.conteiner}
         style={{
            paddingTop: newPadding?.t,
            paddingBottom: newPadding?.b,
            paddingLeft: newPadding?.l,
            paddingRight: newPadding?.r,


            maxWidth: hasMaxWidth ? 1250 : "auto",
         }}
      >
         {children}
      </div>
   );
}

export default Conteiner;

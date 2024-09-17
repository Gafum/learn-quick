import { NumStr } from "../../types/interfaces";
import styles from "./Conteiner.module.scss";

export interface IcontainerProps {
   children: React.ReactNode;
   newPadding?: { l?: NumStr, r?: NumStr, t?: NumStr, b?: NumStr, all?: NumStr };
   hasMaxWidth?: boolean;
}

function Conteiner(
   { children, newPadding, hasMaxWidth = true }: IcontainerProps
): JSX.Element {

   return (
      <div
         className={styles.conteiner}
         style={{
            // padding: newPadding?.all,
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

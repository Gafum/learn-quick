import { NumStr } from "../../Types/interfaces";
import styles from "./Container.module.scss";

export interface IContainerProps {
   children: React.ReactNode;
   newPadding?: { l?: NumStr; r?: NumStr; t?: NumStr; b?: NumStr };
   hasMaxWidth?: boolean;
}

function Container({
   children,
   newPadding,
   hasMaxWidth = true,
}: IContainerProps): JSX.Element {
   return (
      <div
         className={styles.container}
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

export default Container;

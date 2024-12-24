import { Link } from "react-router-dom";
import styles from "./ErrorComponent.module.scss";

function ErrorComponent(): JSX.Element {
   return (
      <div className={styles.errorComponent}>
         <h2>Something went wrong...</h2>
         <Link to={"/"}>Go home</Link>
      </div>
   );
}

export default ErrorComponent;

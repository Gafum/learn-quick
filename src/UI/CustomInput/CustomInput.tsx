import {
   Dispatch,
   InputHTMLAttributes,
   SetStateAction,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import styles from "./CustomInput.module.scss";

interface ICustomInput
   extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
   setValue?: Dispatch<SetStateAction<string>>;
   inputsWidth?: string;
   rows?: number;
   updateFocuseData?: any;
   timeToFocus?: number;
}

//Custom Input Hook =============>
export function useCustomInput(
   text?: string
): [string, Dispatch<SetStateAction<string>>] {
   const [value, setValue] = useState<string>(text ? text : "");
   return [value, setValue];
}

function CustomInput({
   inputsWidth,
   setValue,
   updateFocuseData,
   required = true,
   timeToFocus = 0,
   ...data
}: ICustomInput): JSX.Element {
   const inp = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

   const inputId = useMemo(
      () => "input" + (Math.random() * 10000).toFixed(0).toString(),
      []
   );

   useEffect(() => {
      setTimeout(() => {
         if (!inp.current) return;
         if (!data.rows) {
            inp.current.focus();
            inp.current.classList.remove(styles.incorrect);
         }
      }, timeToFocus);
   }, [updateFocuseData]);

   function changeValue({ target }: React.ChangeEvent<HTMLInputElement>) {
      if (data.maxLength) {
         if (target.value.length >= data.maxLength) {
            target.classList.add(styles.incorrect);
            return;
         }
      }

      target.classList.remove(styles.incorrect);
      if (setValue) {
         setValue(target.value);
      }
   }

   if (setValue) {
      data.onChange = changeValue;
   }

   return (
      <div
         className={styles.inputes}
         style={{ width: inputsWidth ? inputsWidth : "100%" }}
      >
         {data.rows ? (
            <textarea
               {...data}
               placeholder=""
               required={required}
               id={inputId}
               ref={inp as React.RefObject<HTMLTextAreaElement> | null}
            />
         ) : (
            <input
               {...data}
               placeholder=""
               type="text"
               required={required}
               id={inputId}
               ref={inp as React.RefObject<HTMLInputElement> | null}
            />
         )}
         <label htmlFor={inputId}>{data.placeholder}</label>
      </div>
   );
}

export default CustomInput;

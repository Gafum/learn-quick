import {
   Dispatch,
   forwardRef,
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
   hint: JSX.Element | string;
   setValue: Dispatch<SetStateAction<string>>;
   inputsWidth?: string;
   rows?: number;
   updateFocuseData?: any;
   timeToFocus?: number;
}

interface ISelectInput extends Omit<ICustomInput, "setValue" | "hint"> {}

//Custom Input Hook =============>
export function useCustomInput(
   text?: string
): [string, Dispatch<SetStateAction<string>>] {
   const [value, setValue] = useState<string>(text ? text : "");
   return [value, setValue];
}

//  Create Input or textarea ===========>
const SelectInput = forwardRef((data: ISelectInput, ref): JSX.Element => {
   if (data.rows == 0) {
      return (
         <input
            type="text"
            {...data}
            ref={ref as React.RefObject<HTMLInputElement> | null}
         />
      );
   }
   return (
      <textarea
         {...data}
         ref={ref as React.RefObject<HTMLTextAreaElement> | null}
      />
   );
});

function CustomInput({
   hint = "",
   inputsWidth,
   value = "",
   setValue,
   maxLength = 221244,
   updateFocuseData,
   rows = 0,
   required = true,
   timeToFocus = 0,
}: ICustomInput): JSX.Element {
   const inp = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

   const inputId = useMemo(
      () => "input" + (Math.random() * 10000).toFixed(0).toString(),
      []
   );

   function changeValue({ target }: React.ChangeEvent<HTMLInputElement>) {
      if (maxLength) {
         if (target.value.length >= maxLength) {
            target.classList.add(styles.incorrect);
            return;
         }
      }

      target.classList.remove(styles.incorrect);
      setValue(target.value);
   }

   useEffect(() => {
      setTimeout(() => {
         if (!inp.current) return;
         if (rows == 0) {
            inp.current.focus();
            inp.current.classList.remove(styles.incorrect);
         }
      }, timeToFocus);
   }, [updateFocuseData]);

   return (
      <div
         className={styles.inputes}
         style={{ width: inputsWidth ? inputsWidth : "100%" }}
      >
         <SelectInput
            maxLength={maxLength}
            value={value?.toString()}
            onChange={changeValue}
            rows={rows}
            required={required}
            id={inputId}
            ref={inp}
         />
         <label htmlFor={inputId}>{hint}</label>
      </div>
   );
}

export default CustomInput;

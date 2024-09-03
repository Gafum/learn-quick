import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./CustomInput.module.scss";

interface Iinput {
   hint: JSX.Element | string;
   readonly value: string;
   setValue: Dispatch<SetStateAction<string>>;
   inputsWidth?: string;
   maxLength?: number;
   rows?: number;
   required?: boolean;
}

export function useCustomInput(text?: string): [string, Dispatch<SetStateAction<string>>] {
   const [value, setValue] = useState<string>(text ? text : "");
   return ([value, setValue]);
}


const SelectInput = forwardRef((
   data:
      {
         maxLength: number | undefined,
         value: string,
         onChange: React.ChangeEventHandler,
         rows: number,
         required: boolean,
      },
   ref,
): JSX.Element => {

   if (data.rows == 0) {
      return (<input
         type="text"
         {...data}
         ref={ref as React.RefObject<HTMLInputElement> | null}
      />)
   }
   return (<textarea
      {...data}
      ref={ref as React.RefObject<HTMLTextAreaElement> | null}
   />)

})


function CustomInput(
   {
      hint,
      inputsWidth,
      value,
      setValue,
      maxLength,
      rows = 0,
      required = true
   }: Iinput
): JSX.Element {
   const inp = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

   function changeValue({ target }: React.ChangeEvent<HTMLInputElement>) {
      if (maxLength) {
         if (target.value.length >= maxLength) {
            target.classList.add(styles.incorrect)
            return;
         }
      }

      target.classList.remove(styles.incorrect)
      setValue(target.value)
   }

   useEffect(() => {
      if (!inp.current) return;
      if (rows == 0) {
         inp.current.focus()
         inp.current.classList.remove(styles.incorrect)
      }
   }, [])

   return (
      <div
         className={styles.inputes}
         style={{ width: inputsWidth ? inputsWidth : "100%" }}
      >
         <SelectInput
            maxLength={maxLength}
            value={value}
            onChange={changeValue}
            ref={inp}
            rows={rows}
            required={required}
         />
         <label>{hint}</label>
      </div>
   );
}

export default CustomInput;
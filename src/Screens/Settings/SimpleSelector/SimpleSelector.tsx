import { IsettingsData } from "../../../Types/interfaces";
import { paramInSettings } from "../Setting";
import { ISettingsListGenerator } from "./SettingsListGenerator";
import styles from "../Settings.module.scss";

interface ISimpleSelectorProps extends ISettingsListGenerator {
   parameterName: string
}

export function SimpleSelector({
   listName,
   parameterName,
   settingsData,
   setSettingsData,
}: ISimpleSelectorProps): JSX.Element {

   function invertParameter(event: React.MouseEvent, section: string, param: string) {
      event.preventDefault()
      //Dangerous there is not TypeScript
      setSettingsData((prev: IsettingsData) => {
         let data = JSON.parse(JSON.stringify(prev));
         data[section][param].data = !data[section][param].data
         return data;
      })
   }

   let data: paramInSettings = settingsData[listName][
      (parameterName as keyof IsettingsData[typeof listName])
   ]


   return (<>
      <div className={styles.parameterSelector}>
         <span>{data.question}</span>
         <button
            onClick={
               (event) => invertParameter(event, listName, parameterName)
            }
            className={styles.chengerBtn}>
            {data.data ? data.answes[0] : data.answes[1]}

            <svg viewBox="0 0 73 60" fill="none" xmlns="http://www.w3.org/2000/svg">


               {!data.data && <rect fill="white" x="2.5" y="2.5" width="41" height="41" rx="4.5" stroke="#4A0E5C" strokeWidth="5" />}
               <rect x="36.6183" y="12.2664" width="34.8902" height="34.8902" rx="4.5" transform="rotate(22.5 36.6183 12.2664)" fill="#4A0E5C" stroke="#4A0E5C" strokeWidth="5" />
               {data.data && <rect fill="white" x="2.5" y="2.5" width="41" height="41" rx="4.5" stroke="#4A0E5C" strokeWidth="5" />}
            </svg>

         </button>

      </div>
   </>
   )
}
import { useAtom } from "jotai";
import { settingsDataConst } from "../../jotaiData/jotaiData";
import { IsettingsData } from "../../types/interfaces";
import styles from "./Settings.module.scss";
import { createClasses } from "../../function/createClasses";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { RESET } from "jotai/utils";

export interface paramInSettings {
   question: string;
   answes: string[];
   data: boolean;
}

function Settings(): JSX.Element {
   const [settingsData, setSettingsData] = useAtom(settingsDataConst)

   function invertParameter(section: string, param: string) {
      //Dangerous there is not TypeScript
      setSettingsData((prev: IsettingsData) => {
         let data = JSON.parse(JSON.stringify(prev));
         data[section][param].data = !data[section][param].data
         return data;
      })
   }

   return (
      <div className={styles.settingsScreen}>
         {(Object.keys(settingsData) as (keyof IsettingsData)[])
            .map((elem: keyof IsettingsData) => {
               return (
                  <div
                     className={createClasses([styles.section, styles.settingsScreen])}
                     key={elem.toString()}
                  >
                     <h3>{elem}</h3>
                     {
                        Object.keys(settingsData[elem] as IsettingsData[typeof elem]).map((i: string) => {
                           let data: paramInSettings = settingsData[elem][
                              (i as keyof IsettingsData[typeof elem])
                           ]
                           return (
                              <div className={styles.parameter} key={i.toString()}>
                                 <span>{data.question}</span>
                                 <button onClick={() => invertParameter(elem, i)}>
                                    {data.data ? data.answes[0] : data.answes[1]}

                                    <svg viewBox="0 0 73 60" fill="none" xmlns="http://www.w3.org/2000/svg">


                                       {!data.data && <rect fill="white" x="2.5" y="2.5" width="41" height="41" rx="4.5" stroke="#4A0E5C" strokeWidth="5" />}
                                       <rect x="36.6183" y="12.2664" width="34.8902" height="34.8902" rx="4.5" transform="rotate(22.5 36.6183 12.2664)" fill="#4A0E5C" stroke="#4A0E5C" strokeWidth="5" />
                                       {data.data && <rect fill="white" x="2.5" y="2.5" width="41" height="41" rx="4.5" stroke="#4A0E5C" strokeWidth="5" />}
                                    </svg>

                                 </button>

                              </div>
                           )
                        })
                     }
                  </div>
               )
            })
         }

         <CustomBtn className={styles.resetBtn} onClick={() => setSettingsData(RESET)}>
            Reset Settings
         </CustomBtn>
      </div>
   );
}

export default Settings;
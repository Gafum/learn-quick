import { createClasses } from "../../../function/createClasses";
import { IsettingsData } from "../../../types/interfaces";
import styles from "../Settings.module.scss";
import { paramInSettings } from "../Setting";

interface ISimpleSelectorProps {
   settingsData: IsettingsData,
   myName: keyof IsettingsData,
   setSettingsData: (arg: (prev: IsettingsData) => IsettingsData) => void;
}

function SimpleSelector({ myName,
   settingsData,
   setSettingsData
}: ISimpleSelectorProps): JSX.Element {

   function invertParameter(section: string, param: string) {
      //Dangerous there is not TypeScript
      setSettingsData((prev: IsettingsData) => {
         let data = JSON.parse(JSON.stringify(prev));
         data[section][param].data = !data[section][param].data
         return data;
      })
   }

   return (
      <div
         className={createClasses([styles.section, styles.settingsScreen])}
         key={myName.toString()}
      >
         <h3>{myName}</h3>
         {
            Object.keys(settingsData[myName] as IsettingsData[typeof myName]).map((i: string) => {
               let data: paramInSettings = settingsData[myName][
                  (i as keyof IsettingsData[typeof myName])
               ]
               return (
                  <div className={styles.parameter} key={i.toString()}>
                     <span>{data.question}</span>
                     <button onClick={() => invertParameter(myName, i)}>
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
   );
}

export default SimpleSelector;
import { IsettingsData } from "../../types/interfaces";
import styles from "./Settings.module.scss";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { RESET } from "jotai/utils";
import ChooseFilter from "../../Components/ChooseFilter/ChooseFilter";
import SimpleSelector from "./SimpleSelector/SimpleSelector";

import { settingsDataConst } from "../../jotaiData/jotaiData";
import { useAtom } from "jotai";
import { createClasses } from "../../function/createClasses";

export interface paramInSettings {
   question: string;
   answes: string[];
   data: boolean;
}

function Settings(): JSX.Element {
   const [settingsData, setSettingsData] = useAtom(settingsDataConst)


   return (
      <div className={styles.settingsScreen}>
         {(Object.keys(settingsData) as (keyof IsettingsData)[])
            .map((elem: keyof IsettingsData) => {
               if (elem == "filterParams") {
                  return <div
                     className={createClasses([styles.section, styles.settingsScreen])}
                  >
                     <h3>Filter settings</h3>
                     <div className={styles.leftSideBlock}>
                        <ChooseFilter />
                     </div>
                  </div>
               }
               return (
                  <SimpleSelector
                     myName={elem}
                     setSettingsData={setSettingsData}
                     settingsData={settingsData}
                  />
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
import { IsettingsData } from "../../Types/interfaces";
import styles from "./Settings.module.scss";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { RESET } from "jotai/utils";
import { SettingsListGenerator } from "./SimpleSelector/SettingsListGenerator";

import { settingsDataConst } from "../../JotaiData/jotaiData";
import { useAtom } from "jotai";

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
               return (
                  <SettingsListGenerator
                     key={elem.toString()}
                     listName={elem}
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
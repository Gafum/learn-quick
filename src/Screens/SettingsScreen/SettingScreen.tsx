import { IsettingsData } from "../../Types/interfaces";
import styles from "./SettingsScreen.module.scss";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { RESET } from "jotai/utils";
import { SettingsListGenerator } from "./SimpleSelector/SettingsListGenerator";

import { settingsDataConst } from "../../JotaiData/jotaiData";
import { useAtom } from "jotai";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";
import KeyboardShortcuts from "./KeyboardShortcuts/KeyboardShortcuts";

export interface IparamInSettings {
   question: string;
   answes: string[];
   data: boolean;
}

function Settings(): JSX.Element {
   const [settingsData, setSettingsData] = useAtom(settingsDataConst)


   return (
      <LazyMotion features={domAnimation}>
         <m.div
            style={{ height: "100%" }}
            className={styles.settingsScreen}
            {...ScreensAnimation}
         >
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

            <KeyboardShortcuts />

            <CustomBtn className={styles.resetBtn} onClick={() => setSettingsData(RESET)}>
               Reset Settings
            </CustomBtn>
         </m.div>
      </LazyMotion >
   );
}

export default Settings;
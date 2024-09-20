import { createClasses } from "../../../Function_temp/createClasses";
import { IsettingsData } from "../../../Types_temp/interfaces";
import styles from "../Settings.module.scss";
import ChooseFilter from "../../../Components/ChooseFilter/ChooseFilter";
import { SimpleSelector } from "./SimpleSelector";
import { RESET } from "jotai/utils";

export interface ISettingsListGenerator {
   settingsData: IsettingsData,
   listName: keyof IsettingsData,
   setSettingsData: (value: typeof RESET | IsettingsData | ((prev: IsettingsData) => IsettingsData)) => void;
}

export function SettingsListGenerator({
   listName,
   settingsData,
   setSettingsData
}: ISettingsListGenerator): JSX.Element {

   if (listName == "filterParams") {
      return <div
         className={createClasses([styles.section, styles.settingsScreen])}
      >
         <h3>Main Screen</h3>
         <ChooseFilter />
      </div>
   }

   return (
      <div
         className={createClasses([styles.section, styles.settingsScreen])}
         key={listName.toString()}
      >
         <h3>{listName}</h3>
         {
            Object.keys(settingsData[listName] as IsettingsData[typeof listName]).map(
               (parameterName: string) =>
                  <SimpleSelector
                     key={parameterName.toString()}
                     listName={listName}
                     settingsData={settingsData}
                     setSettingsData={setSettingsData}
                     parameterName={parameterName}
                  />
            )
         }
      </div>
   );
}

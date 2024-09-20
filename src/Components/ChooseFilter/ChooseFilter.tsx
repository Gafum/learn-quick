import { ChangeEvent } from "react";
import styles from "./ChooseFilter.module.scss";
import { useAtom } from "jotai";
import { settingsDataConst } from "../../JotaiData_temp/jotaiData";
import { IsettingsData, sortTypeNames } from "../../Types_temp/interfaces";
import { SimpleSelector } from "../../Screens/Settings/SimpleSelector/SimpleSelector";

export const filterList: { name: string; sortType: sortTypeNames }[] = [
   { name: "Name", sortType: "name" },
   { name: "Length", sortType: "length" },
   { name: "Date", sortType: "id" },
   { name: "Groups", sortType: "icon" },
]


function ChooseFilter(): JSX.Element {
   const [settingsData, setSettingsData] = useAtom(settingsDataConst)

   const selectedOption = settingsData.filterParams.selectedSortType

   function setSelectedOption(newValue: sortTypeNames) {
      setSettingsData((prev) => {
         const localList: IsettingsData = JSON.parse(JSON.stringify(prev))
         localList.filterParams.selectedSortType = newValue;
         return localList;
      })
   }

   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.currentTarget.value as sortTypeNames);
   };


   return (
      <>
         <div className={styles.spaceBetweenBlock}>
            <span>Select filter:</span>
            <div className={styles.radioContainer}>
               {filterList.map(({ name, sortType }) => {
                  return (
                     <label className={styles.customLabel} key={name}>
                        <input
                           type="radio"
                           name="filter"
                           value={sortType}
                           checked={selectedOption === sortType}
                           onChange={handleOptionChange}
                           className={styles.radioInput}
                        />
                        <span>{name}</span>
                     </label>
                  )
               })}

            </div>
         </div>

         <SimpleSelector
            setSettingsData={setSettingsData}
            settingsData={settingsData}
            listName="filterParams"
            parameterName="reverseList"
         />
      </>
   );
}

export default ChooseFilter;
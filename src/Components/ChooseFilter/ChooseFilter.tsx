import { ChangeEvent } from "react";
import styles from "./ChooseFilter.module.scss";
import { useAtom } from "jotai";
import { settingsDataConst } from "../../jotaiData/jotaiData";
import { IsettingsData, sortTypeNames } from "../../types/interfaces";

const filterList: { name: string; sortType: sortTypeNames }[] = [
   { name: "Name", sortType: "name" },
   { name: "Length", sortType: "length" },
   { name: "Date", sortType: "id" },
   { name: "Groups", sortType: "icon" },
]


function ChooseFilter(): JSX.Element {
   const [{ filterParams }, setSettings] = useAtom(settingsDataConst)

   const selectedOption = filterParams.selectedSortType

   function setSelectedOption(newValue: sortTypeNames) {
      setSettings((prev) => {
         const localList: IsettingsData = JSON.parse(JSON.stringify(prev))
         localList.filterParams.selectedSortType = newValue;
         return localList;
      })
   }

   const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.currentTarget.value as sortTypeNames);
   };


   return (
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

      </div>);
}

export default ChooseFilter;
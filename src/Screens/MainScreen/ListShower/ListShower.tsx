import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import Card from "../Card/Card";
import { filterList } from "../MyFunction/sortFilter";
import styles from "../MainScreen.module.scss";
import { useAtom, useAtomValue } from "jotai";
import { settingsDataConst, topicsData } from "../../../JotaiData/jotaiData";
import { ITopicData } from "../../../Types/interfaces";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { checkFirstTime } from "../MyFunction/checkFirstTime";
import DataNotFound from "../../../Components/Error/DataNotFound/DataNotFound";

interface IListShowerProps {
   setNewComponentData: React.Dispatch<React.SetStateAction<ITopicData>>;
   setShowAddSection: React.Dispatch<React.SetStateAction<boolean>>;
   setShowFilterModule: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListShower({
   setNewComponentData,
   setShowAddSection,
   setShowFilterModule,
}: IListShowerProps): JSX.Element {
   const [topicList, setTopicList] = useAtom(topicsData);

   //Filter and sort settings
   const { filterParams } = useAtomValue(settingsDataConst);

   useEffect(() => {
      checkFirstTime(setTopicList);
   }, []);

   if (topicList.length == 0) {
      return (
         <>
            <DataNotFound
               text={"You have no categories"}
               btnText={"Create new Category"}
               callback={() => {
                  setNewComponentData({
                     id: "",
                     data: [],
                     name: "",
                     icon: "language",
                  });
                  setShowAddSection(true);
               }}
            />
         </>
      );
   } else {
      return (
         <>
            <div className={styles.sectionName}>
               <span>Categories</span>
               <CustomBtn onClick={() => setShowFilterModule(true)}>
                  Filter
               </CustomBtn>
            </div>

            <div className={styles.cards}>
               <AnimatePresence>
                  {filterList(topicList, {
                     parameter: filterParams.selectedSortType,
                     reverse: filterParams.reverseList.data,
                  }).map((element) => (
                     <Card
                        key={element.id.toString()}
                        editCard={(event: React.MouseEvent) => {
                           event.stopPropagation();
                           event.preventDefault();
                           setNewComponentData({ ...element });
                           setShowAddSection(true);
                        }}
                        data={element}
                     />
                  ))}
               </AnimatePresence>
            </div>
         </>
      );
   }
}

export default ListShower;

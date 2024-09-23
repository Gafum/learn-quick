import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import Card from "../Card/Card";
import { filterList } from "../MyFunction/sortFilter";
import styles from "../MainScreen.module.scss";
import { useAtom, useAtomValue } from "jotai";
import { settingsDataConst, topicsData } from "../../../JotaiData/jotaiData";
import { topicData } from "../../../Types/interfaces";

interface IListShowerProps {
   setNewComponentData: React.Dispatch<React.SetStateAction<topicData>>;
   setShowAddSection: React.Dispatch<React.SetStateAction<boolean>>;
   setShowFilterModule: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListShower({
   setNewComponentData,
   setShowAddSection,
   setShowFilterModule
}: IListShowerProps): JSX.Element {
   const [topicList] = useAtom(topicsData)

   //Filter and sort settings
   const { filterParams } = useAtomValue(settingsDataConst)

   if (topicList.length == 0) {
      return <div style={{
         display: "flex",
         flexDirection: "column",
         gap: 15,
         textAlign: "center",
         width: 300,
         margin: "auto"
      }}>
         You have no categories
         <CustomBtn
            onClick={() => {
               setNewComponentData({
                  id: "",
                  data: [],
                  name: "",
                  icon: "language"
               })
               setShowAddSection(true)
            }}>
            Create new Category
         </CustomBtn>
      </div>

   } else {
      return <>
         <div className={styles.sectionName}>
            <span>Categories</span>
            <CustomBtn onClick={() => setShowFilterModule(true)}>Filter</CustomBtn>
         </div>

         <div className={styles.cards}>
            {
               filterList(topicList, {
                  parameter: filterParams.selectedSortType,
                  reverse: filterParams.reverseList.data,
               }).map((element) =>
                  <Card
                     key={element.id.toString()}
                     editCard={
                        (event: React.MouseEvent) => {
                           event.stopPropagation()
                           event.preventDefault()
                           setNewComponentData({ ...element })
                           setShowAddSection(true);
                        }}
                     data={element} />
               )
            }
         </div>
      </>
   }
}

export default ListShower;
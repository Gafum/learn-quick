import Card from "./Card/Card";
import styles from "./MainScreen.module.scss";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { settingsDataConst, topicsData } from "../../jotaiData/jotaiData";
import { useAtom, useAtomValue } from "jotai";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import DialogCreateNewSection from "./Dialogs/DialogCreateNewSection";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import { filterList } from "./MyFunction/sortFilter";
import DialogFilter from "./Dialogs/DialogFilter";
import { MouseEvent, useState } from "react";
import { topicData } from "../../types/interfaces";

function MainScreen(): JSX.Element {
   const [topicList] = useAtom(topicsData)

   //Filter and sort settings
   const { filterParams } = useAtomValue(settingsDataConst)

   //Data for imported Components:
   const {
      show: showAddSection,
      setShow: setShowAddSection,
      myData: newComponentData,
      setMyData: setNewComponentData,
   } = useCustomDialog<topicData>({
      id: "",
      data: [],
      name: "",
      icon: "language"
   })


   const [showFilterModule, setShowFilterModule] = useState(false)


   return (<>
      {topicList.length == 0 ?
         (<div>
            Empty List
         </div>) :
         (<>
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
                           (event: MouseEvent) => {
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
         )
      }

      <button className={styles.floatBtn} onClick={() => {
         setNewComponentData({
            id: "",
            data: [],
            name: "",
            icon: "language"
         })
         setShowAddSection(true)
      }}>
         <ImgTag src="/plus.svg" style={{
            filter: "invert(1)"
         }} />
      </button >

      <DialogCreateNewSection
         show={showAddSection}
         setShow={setShowAddSection}
         title="Create New Category"
         itemData={newComponentData} />
      <DialogFilter
         show={showFilterModule}
         setShow={setShowFilterModule}
         title="Select Filter" />

   </>);
}

export default MainScreen;
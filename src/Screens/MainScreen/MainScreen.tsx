import styles from "./MainScreen.module.scss";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import DialogCreateNewSection from "./Dialogs/DialogCreateNewSection";
import DialogFilter from "./Dialogs/DialogFilter";
import { useState } from "react";
import { topicData } from "../../Types/interfaces";
import ListShower from "./ListShower/ListShower";

function MainScreen(): JSX.Element {

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

   //States for imported Components
   const [showFilterModule, setShowFilterModule] = useState(false)


   return (<>
      <ListShower
         setNewComponentData={setNewComponentData}
         setShowAddSection={setShowAddSection}
         setShowFilterModule={setShowFilterModule}
      />

      {/* Float Btn */}
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

      {/* Dialogs */}
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
import styles from "./MainScreen.module.scss";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import DialogCreateNewSection from "./Dialogs/DialogCreateNewSection";
import DialogFilter from "./Dialogs/DialogFilter";
import { useState } from "react";
import { ITopicData } from "../../Types/interfaces";
import ListShower from "./ListShower/ListShower";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";

function MainScreen(): JSX.Element {

   //Data for imported Components:
   const {
      show: showAddSection,
      setShow: setShowAddSection,
      myData: newComponentData,
      setMyData: setNewComponentData,
   } = useCustomDialog<ITopicData>({
      id: "",
      data: [],
      name: "",
      icon: "language"
   })

   //States for imported Components
   const [showFilterModule, setShowFilterModule] = useState(false)


   return (
      <LazyMotion features={domAnimation}>
         <m.div
            style={{ height: "100%" }}
            {...ScreensAnimation}
         >
            <ListShower
               setNewComponentData={setNewComponentData}
               setShowAddSection={setShowAddSection}
               setShowFilterModule={setShowFilterModule}
            />
         </m.div>

         {/* Float Btn */}
         <m.button
            {...ScreensAnimation}
            className={styles.floatBtn}
            onClick={() => {
               setNewComponentData({
                  id: "",
                  data: [],
                  name: "",
                  icon: "language"
               })
               setShowAddSection(true)
            }}
         >
            <ImgTag src="/plus.svg" style={{
               filter: "invert(1)"
            }} />
         </m.button >

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

      </LazyMotion>
   );
}

export default MainScreen;
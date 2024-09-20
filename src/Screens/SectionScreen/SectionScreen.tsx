import { topicsData } from "../../JotaiData_temp/jotaiData";
import { useAtomValue } from "jotai";
import WordCard from "./WordCard/WordCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import MianScreenStyles from "../MainScreen/MainScreen.module.scss"
import styles from "./SectionScreen.module.scss";

import { NumStr, wordData } from "../../Types_temp/interfaces";
import { findElemByID } from "../../Function_temp/findElementByID";
import DialogCreateNewWord from "./Dialogs/DialogCreateNewWord";
import useGetParams from "../../Hooks/useGetParams";
import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";


function SectionScreen(): JSX.Element {

   let backTopicList = useAtomValue(topicsData)

   const sectionId = useGetParams(backTopicList)

   //Create Main List
   const myIterableList = findElemByID(backTopicList, sectionId).data as wordData[]
   if (!myIterableList) throw new Error("Page not Found");

   const {
      show: showModule,
      setShow: setShowModule,
      myData: itemData,
      setMyData: setItemData
   } =
      useCustomDialog<wordData>({
         id: "",
         word: "",
         meaning: "",
         img: "",
         rate: 0,
      });

   function editCard(id: NumStr) {
      setItemData(findElemByID(myIterableList, id))
      setShowModule(true)
   }

   function openDialog() {
      setItemData({
         id: 0,
         word: "",
         meaning: "",
         img: "",
         rate: 0,
      })
      setShowModule(true);
   }

   return (<>
      {/* Main List */}
      {myIterableList.length == 0 ?
         <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            textAlign: "center",
            width: 300,
            margin: "auto"
         }} >
            You have no Cards
            <CustomBtn onClick={openDialog}>
               Create Card
            </CustomBtn >
         </div >
         : ""
      }
      <ResponsiveMasonry
         columnsCountBreakPoints={{ 0: 1, 300: 2, 450: 3, 600: 4, 800: 5, 1000: 6, 1300: 7 }}
      >
         <Masonry className={styles.sectionScreen} gutter="10px">

            {myIterableList.map((e: wordData) => <WordCard editElement={editCard} {...e} key={e.id} />)}
         </Masonry>
      </ResponsiveMasonry>

      {/* Float Btn */}
      <button className={MianScreenStyles.floatBtn} onClick={openDialog} >
         <ImgTag src="/plus.svg" alt="+" style={{
            filter: "invert(1)"
         }} />
      </button >

      {/* Dialogs */}
      <DialogCreateNewWord
         show={showModule}
         setShow={setShowModule}
         sectionId={sectionId}
         itemData={itemData}
      />
   </>
   );
}

export default SectionScreen;
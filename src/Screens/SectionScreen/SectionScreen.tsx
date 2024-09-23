import WordCard from "./WordCard/WordCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import MianScreenStyles from "../MainScreen/MainScreen.module.scss"
import styles from "./SectionScreen.module.scss";

import { NumStr, wordData } from "../../Types/interfaces";
import { findElemByID } from "../../Function/findElementByID";
import DialogCreateNewWord from "./Dialogs/DialogCreateNewWord";

import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import CustomBtn from "../../UI/CustomBtn/CustomBtn";
import useTestData from "../../Hooks/useTestData";


function SectionScreen(): JSX.Element {

   const { isLoading, sectionId, myIterableList } = useTestData({ updateIterableList: true })

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

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>
   }

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

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>
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

            {myIterableList.sort((a, b) => a.id > b.id ? 1 : -1).map((e: wordData) => <WordCard editElement={editCard} {...e} key={e.id} />)}
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
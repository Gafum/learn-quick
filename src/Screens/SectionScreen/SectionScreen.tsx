import { topicsData } from "../../jotaiData/jotaiData";
import { useAtomValue } from "jotai";
import WordCard from "./WordCard/WordCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import MianScreenStyles from "../MainScreen/MainScreen.module.scss"
import styles from "./SectionScreen.module.scss";

import { NumStr, wordData } from "../../types/interfaces";
import { findElemByID } from "../../function/findElementByID";
import { useState } from "react";
import DialogCreateNewWord from "./Dialogs/DialogCreateNewWord";
import useGetParams from "../../Hooks/useGetParams";


function SectionScreen(): JSX.Element {

   let backTopicList = useAtomValue(topicsData)

   const sectionId = useGetParams(backTopicList)

   //Create Main List
   const myIterableList = findElemByID(backTopicList, sectionId).data as wordData[]
   if (!myIterableList) throw new Error("Page not Found");

   //show Dialog
   const [showModule, setShowModule] = useState(false);

   //edit Card
   const [itemData, setItemData] = useState<wordData>({
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
      <ResponsiveMasonry
         columnsCountBreakPoints={{ 0: 1, 300: 2, 450: 3, 600: 4, 800: 5, 1000: 6, 1300: 7 }}
      >
         <Masonry className={styles.sectionScreen} gutter="10px">

            {myIterableList.map((e: wordData) => <WordCard editElement={editCard} {...e} key={e.id} />)}
         </Masonry>
      </ResponsiveMasonry>
      <button className={MianScreenStyles.floatBtn} onClick={openDialog} >
         <ImgTag src="/plus.svg" alt="+" style={{
            filter: "invert(1)"
         }} />
      </button >

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
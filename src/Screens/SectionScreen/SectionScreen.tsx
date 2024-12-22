import WordCard from "./WordCard/WordCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImgTag from "../../UI/CustomImage/CustomImageTag";
import MianScreenStyles from "../MainScreen/MainScreen.module.scss";
import styles from "./SectionScreen.module.scss";

import { NumStr, IWordData } from "../../Types/interfaces";
import { findElemByID } from "../../Function/findElementByID";
import DialogCreateNewWord from "./Dialogs/DialogCreateNewWord";

import { useCustomDialog } from "../../UI/CustomDialog/CustomDialog";
import useTestData from "../../Hooks/useTestData";
import React, { useEffect } from "react";
import DataNotFound from "../../Components/DataNotFound/DataNotFound";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";

function SectionScreen(): JSX.Element {
   const {
      isLoading,
      sectionId,
      myIterableList,
      setNewParamInTopicData,
      topicName,
   } = useTestData({ updateIterableList: true });

   const {
      show: showModule,
      setShow: setShowModule,
      myData: itemData,
      setMyData: setItemData,
   } = useCustomDialog<IWordData>({
      id: "",
      word: "",
      meaning: "",
      img: "",
      rate: 0,
   });

   useEffect(() => {
      document.title = topicName + " - Learn Quick";
      window.scrollTo(0, 0);
   }, [topicName]);

   function editCard(id: NumStr) {
      setItemData(findElemByID(myIterableList, id));
      setShowModule(true);
   }

   function toggleFavorites(event: React.MouseEvent, id: NumStr) {
      event?.preventDefault();
      event?.stopPropagation();
      setNewParamInTopicData({
         id: id,
         param: "rate",
         newData: findElemByID(myIterableList, id).rate <= 0 ? 10 : 0,
      });
   }

   function openDialog() {
      setItemData({
         id: 0,
         word: "",
         meaning: "",
         img: "",
         rate: 0,
      });
      setShowModule(true);
   }

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>;
   }

   return (
      <LazyMotion features={domAnimation}>
         <m.div style={{ height: "100%" }} {...ScreensAnimation}>
            {/* Main List */}
            {myIterableList.length == 0 ? (
               <DataNotFound
                  text="You have no Cards"
                  btnText="Create Card"
                  callback={openDialog}
               />
            ) : (
               ""
            )}

            <ResponsiveMasonry
               columnsCountBreakPoints={{
                  0: 1,
                  300: 2,
                  450: 3,
                  600: 4,
                  800: 5,
                  1000: 6,
                  1300: 7,
               }}
            >
               <Masonry className={styles.sectionScreen} gutter="10px">
                  {myIterableList
                     .sort((a, b) => (a.id > b.id ? 1 : -1))
                     .map((e: IWordData) => (
                        <WordCard
                           editElement={editCard}
                           toggleFavorites={toggleFavorites}
                           {...e}
                           key={e.id}
                        />
                     ))}
               </Masonry>
            </ResponsiveMasonry>
         </m.div>
         {/* Float Btn */}
         <m.button
            {...ScreensAnimation}
            className={MianScreenStyles.floatBtn}
            onClick={openDialog}
         >
            <ImgTag
               src="/plus.svg"
               alt="+"
               style={{
                  filter: "invert(1)",
               }}
            />
         </m.button>

         {/* Dialogs */}
         <DialogCreateNewWord
            show={showModule}
            setShow={setShowModule}
            sectionId={sectionId}
            itemData={itemData}
         />
      </LazyMotion>
   );
}

export default SectionScreen;

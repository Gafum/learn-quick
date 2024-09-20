import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import CustomInput, { useCustomInput } from "../../../UI/CustomInput/CustomInput";

import styles from "../MainScreen.module.scss";
import { useSetAtom } from "jotai";
import { topicsData } from "../../../JotaiData/jotaiData";
import { generateUnicID } from "../../../Function/GenerateUnicID";
import { topicData } from "../../../Types/interfaces";
import Slider from "react-slick";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import { findIndexOfELement } from "../../../Function/findElementByID";

const allImg = ["language", "science", "mathematics", "literature"];

interface IdialogCreateNewSection extends ICustomDialogProps {
   itemData: topicData;
}

function DialogCreateNewSection({ show, setShow, itemData }: IdialogCreateNewSection): JSX.Element {
   const setTopicList = useSetAtom(topicsData)

   const [value, setValue] = useCustomInput(itemData.name)
   const [slideIndex, setSlideIndex] = useState(0);
   const sliderRef = useRef<Slider>(null);

   useEffect(() => {
      if (!sliderRef.current) return;

      setValue(itemData.name)

      setSlideIndex(allImg.findIndex(element => element == itemData.icon))
      sliderRef.current.slickGoTo(
         allImg.findIndex(element => element == itemData.icon),
         true
      )

   }, [itemData])

   function createNewSection(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      if (itemData.id == "") {
         setTopicList(
            (data: topicData[]) => {
               return [...data,
               {
                  icon: allImg[slideIndex],
                  name: value.toString().trim().toString(),
                  id: generateUnicID(),
                  data: []
               }];
            }
         )
      } else {
         setTopicList(
            (prev: topicData[]) => {
               let localList: topicData[] = JSON.parse(JSON.stringify(prev))
               localList[findIndexOfELement(localList, itemData.id)].name = value;
               localList[findIndexOfELement(localList, itemData.id)].icon = allImg[slideIndex];
               return localList;
            }
         )
      }

      setShow(false)
   }

   function deleteSection(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()
      setTopicList(
         (prev: topicData[]) => {
            let localList: topicData[] = JSON.parse(JSON.stringify(prev))
            localList.splice(findIndexOfELement(localList, itemData.id), 1)
            return localList;
         }
      )
      setShow(false)
   }

   return (<>
      <CustomDialog
         show={show}
         setShow={setShow}
         title={
            itemData.id == "" ? "Add Category" : "Edit Category"
         }
      >
         <div className={styles.addSectionBlock}>

            <form className={styles.addSectionForm} onSubmit={createNewSection}>
               <div className={styles.selectImg}>
                  <Slider
                     infinite={true}
                     dots={false}
                     speed={400}
                     slidesToShow={1}
                     ref={sliderRef}
                     afterChange={(index) => setSlideIndex(index)}
                  >
                     {allImg.map((e) =>
                        <div className={styles.sliderElement} key={e}>
                           <ImgTag src={`/${e}.svg`} />
                        </div>
                     )}
                  </Slider>
               </div>

               <CustomInput
                  hint={"Section name"}
                  value={value}
                  setValue={setValue}
                  maxLength={12}
                  updateFocuseData={itemData}
               />

               {itemData.id == ""
                  ? "" :
                  <CustomBtn onClick={deleteSection} className={styles.delteBtn}>
                     Delete
                  </CustomBtn>
               }


               <CustomBtn>
                  {itemData.id == "" ? "Add" : "Edit"}
               </CustomBtn>
            </form>
         </div >
      </CustomDialog >
   </>);
}

export default DialogCreateNewSection;
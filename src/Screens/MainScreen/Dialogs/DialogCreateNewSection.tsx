import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import CustomDialog, {
   ICustomDialogProps,
} from "../../../UI/CustomDialog/CustomDialog";
import CustomInput, {
   useCustomInput,
} from "../../../UI/CustomInput/CustomInput";

import styles from "../MainScreen.module.scss";
import { useSetAtom } from "jotai";
import { topicsData } from "../../../JotaiData/jotaiData";
import { generateUnicID } from "../../../Function/GenerateUnicID";
import { ITopicData } from "../../../Types/interfaces";
import Slider from "react-slick";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import { findIndexOfELement } from "../../../Function/findElementByID";

export const allImg = ["language", "science", "mathematics", "literature"];

interface IdialogCreateNewSection extends ICustomDialogProps {
   itemData: ITopicData;
}

function DialogCreateNewSection({
   show,
   setShow,
   itemData,
}: IdialogCreateNewSection): JSX.Element {
   const setTopicList = useSetAtom(topicsData);

   const [value, setValue] = useCustomInput(itemData.name);
   const [slideIndex, setSlideIndex] = useState(0);
   const sliderRef = useRef<Slider>(null);

   useEffect(() => {
      if (!sliderRef.current) return;

      setValue(itemData.name);

      setSlideIndex(allImg.findIndex((element) => element == itemData.icon));
      sliderRef.current.slickGoTo(
         allImg.findIndex((element) => element == itemData.icon),
         true
      );
   }, [itemData]);

   function createNewSection(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (itemData.id == "") {
         setTopicList((data: ITopicData[]) => {
            return [
               ...data,
               {
                  icon: allImg[slideIndex],
                  name: value.toString().trim().toString(),
                  id: generateUnicID(),
                  data: [],
               },
            ];
         });
      } else {
         setTopicList((prev: ITopicData[]) => {
            let localList: ITopicData[] = JSON.parse(JSON.stringify(prev));
            localList[findIndexOfELement(localList, itemData.id)].name = value;
            localList[findIndexOfELement(localList, itemData.id)].icon =
               allImg[slideIndex];
            return localList;
         });
      }

      setShow(false);
   }

   function deleteSection(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
      setTopicList((prev: ITopicData[]) => {
         let localList: ITopicData[] = JSON.parse(JSON.stringify(prev));
         localList.splice(findIndexOfELement(localList, itemData.id), 1);
         return localList;
      });
      setShow(false);
   }

   return (
      <>
         <CustomDialog
            show={show}
            setShow={setShow}
            title={itemData.id == "" ? "Add Category" : "Edit Category"}
         >
            <div className={styles.addSectionBlock}>
               <form
                  className={styles.addSectionForm}
                  onSubmit={createNewSection}
               >
                  <div className={styles.selectImg}>
                     <Slider
                        infinite={true}
                        dots={false}
                        speed={400}
                        slidesToShow={1}
                        ref={sliderRef}
                        afterChange={(index) => setSlideIndex(index)}
                     >
                        {allImg.map((e) => (
                           <div className={styles.sliderElement} key={e}>
                              <ImgTag src={`/${e}.svg`} />
                           </div>
                        ))}
                     </Slider>
                  </div>

                  <CustomInput
                     placeholder={"Section name"}
                     value={value}
                     setValue={setValue}
                     maxLength={12}
                     updateFocuseData={itemData}
                     timeToFocus={405}
                  />

                  {itemData.id == "" ? (
                     ""
                  ) : (
                     <CustomBtn
                        onClick={deleteSection}
                        className={styles.delteBtn}
                     >
                        Delete
                     </CustomBtn>
                  )}

                  <CustomBtn>{itemData.id == "" ? "Add" : "Edit"}</CustomBtn>
               </form>
            </div>
         </CustomDialog>
      </>
   );
}

export default DialogCreateNewSection;

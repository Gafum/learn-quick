import { FormEvent, MouseEvent, useEffect, useRef } from "react";
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
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import { findIndexOfELement } from "../../../Function/findElementByID";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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

   const swiperRef = useRef<SwiperCore>();

   useEffect(() => {
      if (!swiperRef.current) return;

      const index = allImg.findIndex((element) => element === itemData.icon);

      if (index !== -1) {
         swiperRef.current.slideTo(index);
      }

      setValue(itemData.name);
   }, [itemData]);

   function createNewSection(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (itemData.id == "") {
         setTopicList((data: ITopicData[]) => {
            if (!swiperRef.current) return data;
            return [
               ...data,
               {
                  icon: allImg[swiperRef.current.activeIndex],
                  name: value.toString().trim().toString(),
                  id: generateUnicID(),
                  data: [],
               },
            ];
         });
      } else {
         setTopicList((prev: ITopicData[]) => {
            if (!swiperRef.current) return prev;
            let localList: ITopicData[] = JSON.parse(JSON.stringify(prev));
            localList[findIndexOfELement(localList, itemData.id)].name = value;
            localList[findIndexOfELement(localList, itemData.id)].icon =
               allImg[swiperRef.current.activeIndex];
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
                     <Swiper
                        speed={400}
                        centeredSlides={true}
                        slidesPerView={1}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        navigation={true}
                        modules={[Navigation]}
                        watchOverflow={true}
                     >
                        {allImg.map((e) => (
                           <SwiperSlide
                              className={styles.sliderElement}
                              key={e}
                           >
                              <ImgTag src={`/${e}.svg`} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
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

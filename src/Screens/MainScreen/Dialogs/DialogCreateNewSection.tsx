import { FormEvent } from "react";
import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import CustomInput, { useCustomInput } from "../../../UI/CustomInput/CustomInput";

import styles from "../MainScreen.module.scss";
import { useSetAtom } from "jotai";
import { topicsData } from "../../../jotaiData/jotaiData";
import { generateUnicID } from "../../../function/GenerateUnicID";
import { topicData } from "../../../types/interfaces";
import Slider from "react-slick";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";

interface IFormSectionData extends Omit<topicData, "data" | "id"> { }


const allImg = ["language", "science", "mathematics", "literature"];

function DialogCreateNewSection({ show, setShow, title }: ICustomDialogProps): JSX.Element {
   const setTopicList = useSetAtom(topicsData)
   const [value, setValue] = useCustomInput("")

   //Get Data from user
   function getSectionData(event: FormEvent<HTMLFormElement>): IFormSectionData {
      const sectionIcon: HTMLDivElement | null =
         event.currentTarget.
            querySelector<HTMLDivElement>(".slick-active");

      if (!sectionIcon) throw new Error("400");

      let sectionIconIndex = Number(sectionIcon.dataset.index);

      let myName = value.toString().trim();

      setValue("")

      return { name: myName.toString(), icon: allImg[sectionIconIndex] }
   }

   function createNewSection(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      setTopicList(
         (data: topicData[]) => {
            return [...data,
            {
               ...getSectionData(event),
               id: generateUnicID(),
               data: []
            }];
         }
      )

      setShow(false)
   }

   return (<>
      <CustomDialog show={show} setShow={setShow} title={title}>
         <div className={styles.addSectionBlock}>

            <form className={styles.addSectionForm} onSubmit={createNewSection}>
               <div className={styles.selectImg}>
                  <Slider infinite={true} dots={false} speed={400} slidesToShow={1}>
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
               />

               <CustomBtn>
                  Add
               </CustomBtn>
            </form>
         </div>
      </CustomDialog>
   </>);
}

export default DialogCreateNewSection;
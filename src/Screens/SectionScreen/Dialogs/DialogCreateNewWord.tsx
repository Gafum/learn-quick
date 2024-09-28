import CustomDialog, { ICustomDialogProps } from "../../../UI/CustomDialog/CustomDialog";
import CustomInput, { useCustomInput } from "../../../UI/CustomInput/CustomInput";

import styles from "./DialogCreateNewWord.module.scss";
import { useSetAtom } from "jotai";
import { topicsData } from "../../../JotaiData/jotaiData";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NumStr, topicData, wordData } from "../../../Types/interfaces";
import { findIndexOfELement } from "../../../Function/findElementByID";
import { generateUnicID } from "../../../Function/GenerateUnicID";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";

interface IdialogWordDataProps extends Omit<ICustomDialogProps, "title"> {
   sectionId: NumStr;
   itemData: wordData;
}

function DialogCreateNewWord({ show, setShow, sectionId, itemData }: IdialogWordDataProps): JSX.Element {
   const setTopicList = useSetAtom(topicsData)
   const [wordValue, setWordValue] = useCustomInput("")
   const [meaningValue, setMeaningValue] = useCustomInput("")
   const [image, setImage] = useState<string>("")
   const [showDropdown, setshowDropdown] = useState(false);

   useEffect(() => {
      setWordValue(itemData.word)
      setMeaningValue(itemData.meaning)
      setImage(itemData.img ? itemData.img : "")
   }, [itemData])

   function getAllData(event: FormEvent) {
      event.preventDefault();

      if (meaningValue.length == 0 || wordValue.length == 0) return;

      if (itemData.id) {
         editWord({
            id: itemData.id,
            rate: itemData.rate,
            word: wordValue.toString().trim(),
            meaning: meaningValue.toString().trim(),
            img: image
         })
      } else {
         createNewWords({
            id: generateUnicID(),
            rate: 0,
            word: wordValue.toString().trim(),
            meaning: meaningValue.toString().trim(),
            img: image
         })
      }

      setWordValue("")
      setMeaningValue("")
      setImage("")

      setShow(false)
   }

   function editWord(word: wordData) {
      setTopicList((prev) => {
         let sectionIndex = findIndexOfELement(prev, sectionId);
         if (!(sectionIndex + 1)) return prev;

         let localList: topicData[] = JSON.parse(JSON.stringify(prev));


         let wordIndex = findIndexOfELement(localList[sectionIndex].data, word.id)

         if (!(wordIndex + 1)) {
            return prev;
         }

         // ChangeData
         localList[sectionIndex].data[wordIndex] = word;

         return localList;
      })
   }

   function createNewWords(newWord: wordData) {
      setTopicList((prev) => {
         let sectionIndex = findIndexOfELement(prev, sectionId);
         if (!(sectionIndex + 1)) return prev;

         let localList: topicData[] = JSON.parse(JSON.stringify(prev));

         localList[sectionIndex].data.push(newWord);
         return localList;
      })
   }

   function getImage(event: ChangeEvent<HTMLInputElement>) {
      const file = (event.target as HTMLInputElement).files
      if (!file || !file[0]) return;
      const reader = new FileReader();
      reader.onload = function (event: ProgressEvent<FileReader>) {
         const base64String = (event.target?.result as string).split(',')[1];
         setImage(`data:${file[0].name};base64,${base64String}`);
      };
      reader.readAsDataURL(file[0]);
   }

   function deleteWord(event: React.MouseEvent) {
      event.stopPropagation()
      event.preventDefault()
      setTopicList((prev) => {
         let localList: topicData[] = JSON.parse(JSON.stringify(prev))
         localList[findIndexOfELement(localList, sectionId)].data.splice(
            findIndexOfELement(
               localList[findIndexOfELement(localList, sectionId)]
                  .data,
               itemData.id)
            , 1)

         return localList;
      })

      setShow(false)
   }


   return (<>
      <CustomDialog
         show={show}
         setShow={setShow}
         title={itemData.id ? "Edit Word" : "Add new Word"}
      >
         <div className={styles.addWordBlock}>
            <form className={styles.addWordForm} onSubmit={getAllData}>
               <CustomInput
                  hint={"Title"}
                  value={wordValue}
                  setValue={setWordValue}
                  maxLength={50}
                  rows={0}
                  updateFocuseData={itemData}
               />

               <CustomInput
                  hint={"Meaning"}
                  value={meaningValue}
                  setValue={setMeaningValue}
                  rows={5}
                  maxLength={300}
               />


               <CustomBtn className={styles.addImgBtn} onClick={
                  (e) => {
                     e.stopPropagation()
                     e.preventDefault()
                     setshowDropdown(prev => !prev)
                  }}
               >
                  {image ? "Edit" : "Add"} Image
               </CustomBtn>
               {showDropdown && (
                  <div className={styles.imageSelector}>
                     <div className={styles.imageSelectorInputs}>
                        <div className={styles.inputSelectImg}>
                           <label htmlFor="files">
                              <ImgTag src="/file.svg" />
                              <span>{image ? image.slice(0, 25) : "Browse image"}</span>
                           </label>
                           <input
                              id="files"
                              style={{ display: "none" }}
                              type="file"
                              accept=".jpg, .jpeg, .png"
                              onChange={getImage}
                           />
                        </div>
                        <CustomInput
                           hint="Write link to the image"
                           value={image.slice(0, 200)}
                           setValue={setImage}
                           required={false}
                        />
                     </div>
                     <div className={styles.selectedImg}>
                        {
                           image.length > 0
                              ? <>
                              <div><img alt="preview image" src={image} /></div>
                                 
                                 <button className={styles.deleteImgBtn} onClick={() => setImage("")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 40 40">
                                       <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z">
                                       </path>
                                    </svg>
                                 </button>
                              </>
                              : <img alt="not found" src="/imageNotFound.svg" />
                        }

                     </div>
                  </div>
               )}

               {
                  itemData.id
                     ?
                     <CustomBtn className={styles.deleteBtn} onClick={deleteWord}>
                        Delete Word
                     </CustomBtn>
                     : ""
               }

               <CustomBtn>
                  {itemData.id ? "Edit" : "Add"} Word
               </CustomBtn>
            </form>
         </div>
      </CustomDialog>
   </>);
}

export default DialogCreateNewWord;
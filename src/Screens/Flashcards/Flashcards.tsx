import Flashcard from "./Flashcard/Flashcard";
import Slider from "react-slick";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { wordData } from "../../Types/interfaces";
import styles from "./Flashcards.module.scss";
import "./Flashcard/SliderSettings.scss"
import { sliderSettings } from "./SliderSetting";
import useTestData from "../../Hooks/useTestData";



function Flashcards(): JSX.Element {
   const {
      isLoading,
      setNewParamInTopicData,
      myIterableList,
      setMyIterableList,
      reduceRate,
   } = useTestData()

   const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

   const flaschcardsSlider = useRef<Slider>(null);

   // keybord Events
   const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (!flaschcardsSlider.current) return;

      if (event.key === "ArrowRight" || event.key == "Enter") {
         setCurrentCardIndex((prev) => {
            if (prev <= 0) {
               return 1;
            }

            if (prev >= myIterableList.length - 1) {
               return myIterableList.length - 1;
            }

            return prev + 1;
         })
      } else if (event.key === "ArrowLeft") {
         setCurrentCardIndex((prev) => {
            if (prev == 0) {
               return 0;
            }

            return prev - 1;
         })
      }

   }, [flaschcardsSlider, myIterableList]);

   // add and remove keybord event handler
   useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [handleKeyDown]);

   // change cards when card index changes
   useEffect(() => {
      if (!flaschcardsSlider.current) return;

      flaschcardsSlider.current.slickGoTo(currentCardIndex, true)
   }, [currentCardIndex])


   function currentElementSetter(index: number) {
      setCurrentCardIndex(index)
      reduceRate(myIterableList[index].id)
   }

   function addHardWord(event: MouseEvent): void {
      event?.stopPropagation()

      // local data
      let localWordList: wordData[] = JSON.parse(JSON.stringify(myIterableList))

      function toggleFavorite(newRate: number, currentCardIndex: number): void {

         setNewParamInTopicData({
            id: myIterableList[currentCardIndex].id,
            param: "rate",
            newData: newRate,
         })

         localWordList.forEach(({ id }, index) => {
            if (id == localWordList[currentCardIndex].id) {
               localWordList[index].rate = newRate;
            }
         })
      }

      //add to favorite or remove from them
      if (myIterableList[currentCardIndex].rate <= 0) {
         toggleFavorite(10, currentCardIndex);

         //create new Element
         let newElement: wordData = myIterableList[currentCardIndex]
         newElement.rate = 1

         if (myIterableList[myIterableList.length - 1].word
            !== newElement.word) {
            localWordList = [...localWordList, newElement]
         }
      } else {
         toggleFavorite(0, currentCardIndex);
      }

      setMyIterableList(localWordList)
   }

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>
   }

   return (
      <div className={styles.flashcardsScreen}>
         <div className={styles.flashcards} >
            <Slider
               ref={flaschcardsSlider}
               afterChange={currentElementSetter}
               {...sliderSettings}>
               {myIterableList.map((element: wordData, index) =>
                  <Flashcard
                     key={element.id}
                     {...element}
                     isCurrentCard={currentCardIndex == index}
                     hardWordFunk={addHardWord}
                     {...index == 0 && { isTipCard: true }}
                  />
               )}
            </Slider>
         </div>
      </div >
   );
}

export default Flashcards;
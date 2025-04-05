import Flashcard from "./Flashcard/Flashcard";
import { MouseEvent, useRef, useState } from "react";
import { IWordData } from "../../Types/interfaces";
import styles from "./Flashcards.module.scss";
import "./Flashcard/SliderSettings.scss";
import { sliderSettings } from "./SliderSetting";
import useTestData from "../../Hooks/useTestData";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";
import useHandleKeyDown from "../../Hooks/useHandleKeyDown";
import Slider from "react-slick";

const SliderComponent = Slider as unknown as React.ComponentType<any>;

function Flashcards(): JSX.Element {
   const {
      isLoading,
      setNewParamInTopicData,
      myIterableList,
      setMyIterableList,
      reduceRate,
   } = useTestData();

   const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

   const refFlaschcardsSlider = useRef<Slider>(null);

   useHandleKeyDown({
      callback: (event: KeyboardEvent) => {
         if (!refFlaschcardsSlider.current) return;

         if (event.key === "ArrowRight" || event.key == "Enter") {
            refFlaschcardsSlider.current.slickNext();
         } else if (event.key === "ArrowLeft") {
            refFlaschcardsSlider.current.slickPrev();
         }
      },

      dependencyList: [refFlaschcardsSlider, myIterableList],
   });

   function currentElementSetter(index: number) {
      setCurrentCardIndex(index);
      reduceRate(myIterableList[index].id);
   }

   function addHardWord(event: MouseEvent): void {
      event?.stopPropagation();

      // local data
      let localWordList: IWordData[] = JSON.parse(
         JSON.stringify(myIterableList)
      );

      function toggleFavorite(newRate: number, currentCardIndex: number): void {
         setNewParamInTopicData({
            id: myIterableList[currentCardIndex].id,
            param: "rate",
            newData: newRate,
         });

         localWordList.forEach(({ id }, index) => {
            if (id == localWordList[currentCardIndex].id) {
               localWordList[index].rate = newRate;
            }
         });
      }

      //add to favorite or remove from them
      if (myIterableList[currentCardIndex].rate <= 0) {
         toggleFavorite(10, currentCardIndex);

         //create new Element
         let newElement: IWordData = myIterableList[currentCardIndex];
         newElement.rate = 1;

         if (
            myIterableList[myIterableList.length - 1].word !== newElement.word
         ) {
            localWordList = [...localWordList, newElement];
         }
      } else {
         toggleFavorite(0, currentCardIndex);
      }

      setMyIterableList(localWordList);
   }

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>;
   }

   return (
      <div className={styles.flashcardsScreen}>
         <LazyMotion features={domAnimation}>
            <m.div
               style={{ height: "100%" }}
               className={styles.flashcards}
               {...ScreensAnimation}
            >
               <SliderComponent
                  ref={refFlaschcardsSlider}
                  afterChange={currentElementSetter}
                  {...sliderSettings}
               >
                  {myIterableList.map((element: IWordData, index) => (
                     <Flashcard
                        key={element.id}
                        {...element}
                        isCurrentCard={currentCardIndex == index}
                        hardWordFunk={addHardWord}
                        {...(index == 0 && { isTipCard: true })}
                     />
                  ))}
               </SliderComponent>
            </m.div>
         </LazyMotion>
      </div>
   );
}

export default Flashcards;

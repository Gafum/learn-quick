import Flashcard from "./Flashcard/Flashcard";
import { IWordData } from "../../Types/interfaces";
import styles from "./Flashcards.module.scss";
import { sliderSettings } from "./SliderSetting";
import useTestData from "../../Hooks/useTestData";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ScreensAnimation } from "../../CustomData/animation";
import useHandleKeyDown from "../../Hooks/useHandleKeyDown";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Flashcards(): JSX.Element {
   const {
      isLoading,
      myIterableList,
      reduceRate,
      setNewParamInTopicData,
      setMyIterableList,
   } = useTestData();

   const swiperRef = useRef<SwiperCore>();

   useHandleKeyDown({
      callback: (event: KeyboardEvent) => {
         if (!swiperRef.current) return;

         if (event.key === "ArrowRight" || event.key === "Enter") {
            swiperRef.current.slideNext();
         } else if (event.key === "ArrowLeft") {
            swiperRef.current.slidePrev();
         }
      },
      dependencyList: [myIterableList],
   });

   function addHardWord(event: React.MouseEvent): void {
      event?.stopPropagation();
      if (!swiperRef.current) return;

      const activeSlideIndex = swiperRef.current.activeIndex;

      // local data
      let localWordList: IWordData[] = JSON.parse(
         JSON.stringify(myIterableList)
      );

      function toggleFavorite(newRate: number, activeSlideIndex: number): void {
         setNewParamInTopicData({
            id: myIterableList[activeSlideIndex].id,
            param: "rate",
            newData: newRate,
         });

         localWordList.forEach(({ id }, index) => {
            if (id == localWordList[activeSlideIndex].id) {
               localWordList[index].rate = newRate;
            }
         });
      }

      //add to favorite or remove from them
      if (myIterableList[activeSlideIndex].rate <= 0) {
         toggleFavorite(10, activeSlideIndex);

         //create new Element
         let newElement: IWordData = myIterableList[activeSlideIndex];
         newElement.rate = 1;

         if (
            myIterableList[myIterableList.length - 1].word !== newElement.word
         ) {
            localWordList = [...localWordList, newElement];
         }
      } else {
         toggleFavorite(0, activeSlideIndex);
      }

      setMyIterableList(localWordList);
   }

   if (isLoading) {
      return <h2 style={{ width: "100%", textAlign: "center" }}>Loading...</h2>;
   }

   return (
      <div className={styles.flashcardsScreen+ " fleschcardsScreen"}>
         <LazyMotion features={domAnimation}>
            <m.div
               style={{ height: "100%" }}
               className={styles.flashcards}
               {...ScreensAnimation}
            >
               <Swiper
                  onSlideChange={(swiper) =>
                     reduceRate(myIterableList[swiper.activeIndex].id)
                  }
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  {...sliderSettings}
                  modules={[Navigation]}
               >
                  {myIterableList.map((element: IWordData, index) => (
                     <SwiperSlide key={element.id}>
                        <Flashcard
                           {...element}
                           {...(index == 0 && { isTipCard: true })}
                           addHardWord={addHardWord}
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </m.div>
         </LazyMotion>
      </div>
   );
}

export default Flashcards;

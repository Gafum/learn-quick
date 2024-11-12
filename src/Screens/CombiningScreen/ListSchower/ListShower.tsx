import { AnimatePresence, motion } from "framer-motion";
import { IWordDataCombiningScreen } from "../CombiningScreen";
import { createClasses } from "../../../Function/createClasses";
import styles from "./ListShower.module.scss";
import { NumStr } from "../../../Types/interfaces";
import { settingsDataConst } from "../../../JotaiData/jotaiData";
import { useAtomValue } from "jotai";
import ImgTag from "../../../UI/CustomImage/CustomImageTag";

interface IoneBlockData {
   onClick: (elemId: NumStr) => void;
   myClassChecker: (elemId: NumStr) => boolean;
}

interface IListSchower {
   list: IWordDataCombiningScreen[];
   mySide: boolean; //true - right, false - left
   oneBlockData: IoneBlockData;
}

function CombiningListShower({
   mySide,
   list,
   oneBlockData,
}: IListSchower): JSX.Element {
   const { combining: combiningSettings } = useAtomValue(settingsDataConst);
   const whereIsWord = combiningSettings.whatAsk.data;
   const showQuestion = combiningSettings.showQuestion.data;

   return (
      <div className={mySide ? styles.rightSide : styles.leftSide}>
         <AnimatePresence initial={false}>
            {list.map((elem) => {
               return (
                  <motion.div
                     layout
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.2 }}
                     className={styles.animatedBock}
                     key={elem.id + (mySide ? "right" : "left")}
                  >
                     <button
                        onClick={() => oneBlockData.onClick(elem.id)}
                        className={createClasses([
                           styles.oneBlock,
                           mySide
                              ? elem.wrongAnswer
                                 ? styles.wrongAnswer
                                 : ""
                              : oneBlockData.myClassChecker(elem.id)
                              ? styles.selectedElement
                              : "",
                        ])}
                     >
                        {showQuestion && !mySide && <ImgTag src={elem.img} />}

                        <span>
                           {mySide
                              ? whereIsWord
                                 ? elem.meaning
                                 : elem.word
                              : whereIsWord
                              ? elem.word
                              : elem.meaning}
                        </span>
                     </button>
                  </motion.div>
               );
            })}
         </AnimatePresence>
      </div>
   );
}

export default CombiningListShower;

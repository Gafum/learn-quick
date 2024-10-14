import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import styles from "./KeyboardShortcuts.module.scss";

const KeyboardShortcuts = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className={styles.shortcutsBlock}>
         <CustomBtn onClick={toggleMenu}>
            {isOpen ? "Hide Shortcuts" : "Show Shortcuts"}
         </CustomBtn>
         <AnimatePresence mode="wait">
            {
               isOpen
               &&
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.4 } }}
               >
                  <ul className={styles.shortcutsList}>
                     <li><strong>Flashcards</strong> <span className={styles.line} /></li>
                     <li>
                        <strong>Enter</strong> or <strong>→ (Right Arrow)</strong>: Go to the next card in Flashcards.
                     </li>
                     <li>
                        <strong>← (Left Arrow)</strong>: Go to the previous card in Flashcards.
                     </li>
                     <li>
                        <strong>Spacebar</strong>: Flip the current card.
                     </li>
                     <li><strong>Test</strong><span className={styles.line} /></li>
                     <li>
                        <strong>1, 2, 3, 4</strong>: Select corresponding answers in tests.
                     </li>
                     <li>
                        <strong>Enter</strong>: Repeat test in Writing and Standard Test.
                     </li>
                  </ul>
               </motion.div>
            }
         </AnimatePresence>
      </div>
   );
};

export default KeyboardShortcuts;

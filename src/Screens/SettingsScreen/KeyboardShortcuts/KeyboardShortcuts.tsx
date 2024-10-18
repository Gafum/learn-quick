import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomBtn from "../../../UI/CustomBtn/CustomBtn";
import styles from "./KeyboardShortcuts.module.scss";

const KeyboardShortcuts = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {

      setIsOpen((prev) => !prev);
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
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
               >
                  <ul className={styles.shortcutsList}>
                     <li><h3>Flashcards</h3> <span className={styles.line} /></li>
                     <li>
                        <p>
                           <strong>Enter</strong> or <strong>Right Arrow</strong>: Go to the next card in Flashcards.
                        </p>

                     </li>
                     <li>
                        <p>
                           <strong>Left Arrow</strong>: Go to the previous card in Flashcards.
                        </p>
                     </li>
                     <li>
                        <p><strong>Spacebar</strong>: Flip the current card.</p>
                     </li>
                     <li>
                        <h3>Test</h3><span className={styles.line} /></li>
                     <li>
                        <p><strong>1, 2, 3, 4</strong>: Select corresponding answers in tests.</p>
                     </li>
                     <li>
                        <p><strong>Enter</strong>: Repeat test in Writing and Standard Test.</p>
                     </li>
                  </ul>
               </motion.div>
            }
         </AnimatePresence>
      </div>
   );
};

export default KeyboardShortcuts;

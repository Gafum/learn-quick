import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Conteiner from "../Conteiners/Conteiner";
import ChooseTest from "../ChooseTest/ChooseTest";
import { createClasses } from "../../Function/createClasses";
import { useMemo } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

function Header(): JSX.Element {
   const { pathname } = useLocation()

   const isSectionScreen = useMemo(() => {
      return pathname.startsWith("/section");
   },
      [pathname])

   return (
      <>
         <header className={
            createClasses([styles.staticHader, isSectionScreen && styles.sectionScreen])
         }>
            <Conteiner hasMaxWidth={false}>
               <div className={styles.headerInner}>
                  <Link to={"/"}>Lern quick</Link>
               </div>
            </Conteiner>
         </header >
         <header>
            <Conteiner hasMaxWidth={false}>
               <div className={
                  createClasses(
                     [styles.headerContent, isSectionScreen && styles.sectionScreen]
                  )
               }
               >
                  <div className={styles.headerInner}>
                     <Link to={"/"}>Lern quick</Link>
                  </div>
                  <div className={styles.btnSection}>
                     <Link to={"/settings"}>
                        <img src="/settings.svg" alt="settings" />
                     </Link>
                  </div>

                  <AnimatePresence mode="wait">
                     <LazyMotion features={domAnimation}>
                        {
                           isSectionScreen &&
                           <m.div
                              initial={{ opacity: 0, y: -15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              exit={{ opacity: 0, transition: { duration: 0.4 } }}
                              className={
                                 createClasses([styles.testsPosition])
                              }
                           >
                              <Conteiner
                                 hasMaxWidth={false}
                                 newPadding={{
                                    t: 0,
                                    b: 0,
                                 }}
                              >
                                 <div className={styles.testsBlock}>
                                    <ChooseTest sectionId={pathname.split("/")[2]} />
                                 </div>
                              </Conteiner>
                           </m.div>
                        }
                     </LazyMotion>
                  </AnimatePresence>


               </div>
            </Conteiner>
         </header >
      </>
   );
}

export default Header;

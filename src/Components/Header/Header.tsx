import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "../Containers/Container";
import ChooseTest from "../ChooseTest/ChooseTest";
import { createClasses } from "../../Function/createClasses";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Header(): JSX.Element {
   const { pathname } = useLocation();

   const isSectionScreen = useMemo(() => {
      return pathname.startsWith("/section");
   }, [pathname]);

   return (
      <>
         <header
            className={createClasses([
               styles.staticHeader,
               isSectionScreen && styles.sectionScreen,
            ])}
         >
            <Container hasMaxWidth={false}>
               <div className={styles.headerInner}>
                  <Link to={"/"}>Learn quick</Link>
               </div>
            </Container>
         </header>
         <header>
            <Container hasMaxWidth={false}>
               <div
                  className={createClasses([
                     styles.headerContent,
                     isSectionScreen && styles.sectionScreen,
                  ])}
               >
                  <div className={styles.headerInner}>
                     <Link to={"/"}>Learn quick</Link>
                  </div>
                  <div className={styles.btnSection}>
                     <Link to={"/settings"}>
                        <img src="/settings.svg" alt="settings" />
                     </Link>
                  </div>
                  <AnimatePresence mode="wait">
                     {isSectionScreen && (
                        <motion.div
                           initial={{ opacity: 0, y: -25 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.4 }}
                           exit={{ opacity: 0, transition: { duration: 0.4 } }}
                           className={styles.testsPosition}
                        >
                           <Container
                              hasMaxWidth={false}
                              newPadding={{
                                 t: 0,
                                 b: 0,
                              }}
                           >
                              <div className={styles.testsBlock}>
                                 <ChooseTest
                                    sectionId={pathname.split("/")[2]}
                                 />
                              </div>
                           </Container>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </Container>
         </header>
      </>
   );
}

export default Header;

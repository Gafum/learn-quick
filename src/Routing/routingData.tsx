import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import { AnimatePresence } from "framer-motion";
import ErrorComponent from "../Components/Error/ErrorComponent";
import Conteiner from "../Components/Conteiners/Conteiner";
import { IscreenParam, screenList } from "./screenList";


function Router(): JSX.Element {
   const location = useLocation()
   return (
      <AnimatePresence mode="wait" initial={false}>
         <Routes location={location} key={location.pathname}>
            {screenList.map(({ component, path, hasSectionId, whichConteiner }: IscreenParam) => {
               return (
                  <Route
                     key={path}
                     path={path + (hasSectionId ? "/:sectionId" : "")}
                     element={
                        <Conteiner newPadding={{ b: "60px" }} {...whichConteiner}>
                           {component}
                        </Conteiner>
                     }
                  />
               )
            })}

            <Route path="*" element={<ErrorComponent />} />
         </Routes>
      </AnimatePresence >
   );
}



function MainRouter(): JSX.Element {

   return (
      <BrowserRouter>
         <Header />
         <Router />
      </BrowserRouter>
   );
}

export default MainRouter;
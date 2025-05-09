import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import { AnimatePresence } from "framer-motion";
import ErrorComponent from "../Components/Error/404/ErrorComponent";
import Container from "../Components/Containers/Container";
import { IscreenParam, screenList } from "./screenList";
import { useEffect } from "react";

function Router(): JSX.Element {
   const location = useLocation();
   useEffect(() => {
      let screenName: string | undefined = screenList.find((e) => {
         // location.pathname.split("/") = ["", "pathname", "sectionId"]
         return "/" + location.pathname.split("/")[1] == e.path;
      })?.name;

      if (screenName) {
         document.title = `${screenName} - Learn Quick`;
      } else {
         document.title = "Learn Quick";
      }
   }, [location]);

   return (
      <AnimatePresence mode="wait" initial={false}>
         <Routes location={location} key={location.pathname}>
            {screenList.map(
               ({
                  component,
                  path,
                  hasSectionId,
                  whichContainer,
               }: IscreenParam) => {
                  return (
                     <Route
                        key={path}
                        path={path + (hasSectionId ? "/:sectionId" : "")}
                        errorElement={<ErrorComponent />}
                        element={
                           <Container
                              newPadding={{ b: "60px" }}
                              {...whichContainer}
                           >
                              {component}
                           </Container>
                        }
                     />
                  );
               }
            )}

            <Route path="*" element={<ErrorComponent />} />
         </Routes>
      </AnimatePresence>
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

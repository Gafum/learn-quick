import Flashcards from "../Screens/Flashcards/Flashcards";
import MainScreen from "../Screens/MainScreen/MainScreen";
import SectionScreen from "../Screens/SectionScreen/SectionScreen";
import Settings from "../Screens/SettingsScreen/SettingScreen";
import TestScreen from "../Screens/TestScreen/TestScreen";
import WritingScreen from "../Screens/WritingScreen/WritingScreen";

import { IContainerProps } from "../Components/Containers/Container";
import CombiningScreen from "../Screens/CombiningScreen/CombiningScreen";
import About from "../Screens/AboutScreen/About";
interface IRouterComponentProps extends Omit<IContainerProps, "children"> {}

export interface IscreenParam {
   name: string;
   path: string;
   component: JSX.Element;
   hasSectionId: boolean;
   whichContainer?: IRouterComponentProps;
}

export const screenList: IscreenParam[] = [
   {
      name: "Home",
      path: "/",
      component: <MainScreen />,
      hasSectionId: false,
   },
   {
      name: "About",
      path: "/about",
      component: <About />,
      hasSectionId: false,
   },
   {
      name: "Settings",
      path: "/settings",
      component: <Settings />,
      hasSectionId: false,
   },
   {
      name: "My words",
      path: "/section",
      component: <SectionScreen />,
      hasSectionId: true,
   },
   {
      name: "Writing",
      path: "/writing",
      component: <WritingScreen />,
      hasSectionId: true,
   },
   {
      name: "Test",
      path: "/test",
      component: <TestScreen />,
      hasSectionId: true,
   },
   {
      name: "Combining",
      path: "/combining",
      component: <CombiningScreen />,
      hasSectionId: true,
   },
   {
      name: "Flashcards",
      path: "/flashcards",
      component: <Flashcards />,
      hasSectionId: true,
      whichContainer: { newPadding: { t: 15, b: 40, l: 0, r: 0 } },
   },
];

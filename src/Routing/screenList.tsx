import Flashcards from "../Screens/Flashcards/Flashcards";
import MainScreen from "../Screens/MainScreen/MainScreen";
import SectionScreen from "../Screens/SectionScreen/SectionScreen";
import Settings from "../Screens/Settings/Setting";
import TestScreen from "../Screens/TestScreen/TestScreen";
import WritingScreen from "../Screens/WritingScreen/WritingScreen";

import { IcontainerProps } from "../Components/Conteiners/Conteiner";
interface IRouterComponentProps extends Omit<IcontainerProps, "children"> { }

export interface IscreenParam {
   path: string;
   component: JSX.Element;
   hasSectionId: boolean;
   whichConteiner?: IRouterComponentProps;
}

export const screenList: IscreenParam[] =
   [
      {
         path: "/",
         component: <MainScreen />,
         hasSectionId: false,
      },
      {
         path: "/settings",
         component: <Settings />,
         hasSectionId: false,
      },
      {
         path: "/section",
         component: <SectionScreen />,
         hasSectionId: true,
      },
      {
         path: "/writing",
         component: <WritingScreen />,
         hasSectionId: true,
      },
      {
         path: "/test",
         component: <TestScreen />,
         hasSectionId: true,
      },
      {
         path: "/flashcards",
         component: <Flashcards />,
         hasSectionId: true,
         whichConteiner: { newPadding: { t: 15, b: 40, l: 0, r: 0 } },
      },
   ];

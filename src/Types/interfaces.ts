import { IparamInSettings } from "../Screens/SettingsScreen/SettingScreen";

export interface IWordData {
   readonly id: NumStr;
   word: string;
   meaning: string;
   rate: number;
   img?: string;
}

export interface ITopicData {
   readonly id: NumStr;
   icon: string;
   name: string;
   data: IWordData[];
}

export interface IsettingsData {
   flashcards: {
      showBack: IparamInSettings;
      whereIsImage: IparamInSettings;
   };
   tests: {
      whatAsk: IparamInSettings;
      showQuestion: IparamInSettings;
   };
   writing: {
      whatAsk: IparamInSettings;
      showQuestion: IparamInSettings;
   };
   combining: {
      whatAsk: IparamInSettings;
      showQuestion: IparamInSettings;
   };
   filterParams: {
      selectedSortType: sortTypeNames;
      reverseList: IparamInSettings;
   };
}

export type sortTypeNames = "name" | "length" | "id" | "icon";

export type NumStr = string | number;

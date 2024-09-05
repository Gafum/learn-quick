import { paramInSettings } from "../Screens/Settings/Setting";

export interface wordData {
   readonly id: NumStr;
   word: string;
   meaning: string;
   rate: number;
   img?: string;
}

export interface realWordData extends Omit<wordData, "rate"> {
   rate?: number;
}

export interface topicData {
   readonly id: NumStr;
   icon: string;
   name: string;
   data: wordData[];
}

export type NumStr = string | number;

export interface IsettingsData {
   flashcards: {
      showBack: paramInSettings;
      whereIsImage: paramInSettings;
   };
   tests: {
      whatAsk: paramInSettings;
      showQuestion: paramInSettings;
   };
   writing: {
      whatAsk: paramInSettings;
      showQuestion: paramInSettings;
   };
   filterParams: {
      selectedSortType: sortTypeNames;
   };
}

export type sortTypeNames = "name" | "length" | "id" | "icon";

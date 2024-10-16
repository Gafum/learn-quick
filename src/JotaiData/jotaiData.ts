import { ITopicData, IsettingsData } from "../Types/interfaces";
import { atomWithStorage } from "jotai/utils";
// import { DEVTopicData } from "../DevData/TopicListConst";

export const topicsData = atomWithStorage<ITopicData[]>("topicData", []);

export const settingsDataConst = atomWithStorage<IsettingsData>(
   "settingsData",
   {
      flashcards: {
         showBack: {
            question: "Which side to show?",
            answes: ["Back", "Front"], //   true, false
            data: false,
         },
         whereIsImage: {
            question: "What will be written with the image?",
            answes: ["Word", "Meaning"],
            data: false,
         },
      },
      tests: {
         whatAsk: {
            question: "What should be asked?",
            answes: ["Meaning", "Word"],
            data: false,
         },
         showQuestion: {
            question: "What should be shown?",
            answes: ["Image", "Word"],
            data: false,
         },
      },
      writing: {
         whatAsk: {
            question: "What should be asked?",
            answes: ["Word", "Meaning"],
            data: false,
         },
         showQuestion: {
            question: "What should be shown?",
            answes: ["Image", "Word"],
            data: false,
         },
      },
      filterParams: {
         selectedSortType: "id",
         reverseList: {
            question: "Do you want to reverse list?",
            answes: ["Yes", "No"],
            data: false,
         },
      },
   }
);

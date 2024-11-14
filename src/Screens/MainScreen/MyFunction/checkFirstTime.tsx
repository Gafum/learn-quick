import { SetStateAction } from "react";
import { topicListExample } from "../../../DevData/topicListExample";
import { TopicDataID } from "../../../JotaiData/jotaiData";
import { ITopicData } from "../../../Types/interfaces";

type SetAtom<Args extends any[], Result> = (...args: Args) => Result;


export function checkFirstTime(
   setTopicList: SetAtom<[SetStateAction<ITopicData[]>], void>
) {
   let data = localStorage.getItem(TopicDataID);

   // Add example to the List
   if (!data) {
      localStorage.setItem(TopicDataID, JSON.stringify(topicListExample));
      setTopicList(() => topicListExample);
   }
}

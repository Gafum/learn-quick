import { topicListExample } from "../../../DevData/topicListExample";
import { TopicDataID } from "../../../JotaiData/jotaiData";

export function checkFirstTime() {
   let data = localStorage.getItem(TopicDataID);

   // Add example to the List
   if (!data) {
      localStorage.setItem(TopicDataID, JSON.stringify(topicListExample));
   }
}

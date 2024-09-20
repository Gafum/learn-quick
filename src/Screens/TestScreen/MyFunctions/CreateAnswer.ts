import { shuffleArray } from "../../../Function/shufleArray";
import { NumStr, wordData } from "../../../Types/interfaces";

function createAnswer(
   rightWord: NumStr,
   wordData: wordData[],
   showBack: boolean
): string[] {
   let currentList: wordData[] = JSON.parse(JSON.stringify(wordData));
   let result: string[] = currentList.reduce((prev: string[], cur) => {
      if (cur.id !== rightWord) {
         prev.push(showBack ? cur.word : cur.meaning);
      }
      return prev;
   }, []);

   return [...shuffleArray(result), "a", "b", "c"].slice(0, 3);
}

export default createAnswer;

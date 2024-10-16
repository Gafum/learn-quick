import { shuffleArray } from "../../../Function/shufleArray";
import { NumStr, IWordData } from "../../../Types/interfaces";

function createAnswer(
   rightWord: NumStr,
   oneWordData: IWordData[],
   showBack: boolean
): string[] {
   let currentList: IWordData[] = JSON.parse(JSON.stringify(oneWordData));
   let result: string[] = currentList.reduce((prev: string[], cur) => {
      if (cur.id !== rightWord) {
         prev.push(showBack ? cur.word : cur.meaning);
      }
      return prev;
   }, []);

   return [...shuffleArray(result), "a", "b", "c"].slice(0, 3);
}

export default createAnswer;

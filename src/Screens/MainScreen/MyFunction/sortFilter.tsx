import { sortTypeNames, topicData } from "../../../types/interfaces";

interface IfilterListParams {
   parameter: sortTypeNames
   reverse?: boolean;
}

export function filterList(
   list: topicData[],
   {
      parameter,
      reverse = false
   }: IfilterListParams
): topicData[] {
   let localList = list.sort((a: topicData, b: topicData) => {

      let result = 0;

      function standartSorter(parameter: keyof topicData) {
         if (!a[parameter] || !b[parameter]) return 0;
         if (a[parameter] == b[parameter]) return 0;
         return a[parameter] > b[parameter] ? 1 : -1
      }


      switch (parameter) {
         case "name":
         case "icon":
         case "id": {
            result = standartSorter(parameter);
            break;
         }
         case "length": {
            if (!a.data || !b.data) result = 0;
            if (a.data!.length == b.data!.length) result = 0;
            result = a.data!.length > b.data!.length ? 1 : -1
            break;
         }
      }
      return result;
   })


   if (reverse) {
      return localList.reverse();
   }

   return localList;
}

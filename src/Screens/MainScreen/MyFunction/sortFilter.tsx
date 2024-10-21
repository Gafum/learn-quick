import { sortTypeNames, ITopicData } from "../../../Types/interfaces";

interface IfilterListProps {
   parameter: sortTypeNames
   reverse?: boolean;
}

export function filterList(
   list: ITopicData[],
   {
      parameter,
      reverse = false
   }: IfilterListProps
): ITopicData[] {
   let localList = list.sort((a: ITopicData, b: ITopicData) => {

      let result = 0;

      function standartSorter(parameter: keyof ITopicData) {
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
            result = a.data!.length > b.data!.length ? -1 : 1
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

import { NumStr } from "../Types/interfaces";
import errorRedirect from "./errorRedirect";

interface ImyType {
   id: NumStr;
}

export function findElemByID<T extends ImyType>(list: T[], myId: NumStr): T {
   if (list.length == 0) throw errorRedirect("Can`t find element");
   let res = list.find((element) => element?.id == myId);
   if (!res) return list[0];

   return JSON.parse(JSON.stringify(res));
}

export function findIndexOfELement<T extends ImyType>(
   list: T[],
   myId: NumStr
): number {
   if (list.length == 0) return 0;
   return list.findIndex((element) => element?.id == myId);
}

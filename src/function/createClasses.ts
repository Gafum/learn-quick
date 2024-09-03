import { NumStr } from "../types/interfaces";

export function createClasses(classList: (NumStr | boolean)[]): string {
   let res = classList
      .reduce((prev = "", current) => {
         return prev.toString() + " " + current.toString();
      })
      .toString();

   if (!res) return "";

   return res;
}

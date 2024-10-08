import { NumStr } from "../Types/interfaces";

export function createClasses(classList: (NumStr | boolean)[]): string {
   let res = classList
      .reduce((prev = "", current) => {
         if (!current) {
            console.log("Problem with creating class. Not found");
            return prev.toString();
         }
         return prev.toString() + " " + current.toString();
      })
      .toString();

   if (!res) return "";

   return res;
}

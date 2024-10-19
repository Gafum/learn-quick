export function shuffleArray<T>(array: T[]): T[] {
   let localArray = JSON.parse(JSON.stringify(array));

   for (let i = localArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = localArray[i];
      localArray[i] = localArray[j];
      localArray[j] = temp;
   }
   return localArray;
}

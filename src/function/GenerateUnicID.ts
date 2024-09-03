export function generateUnicID(): string {
   let result = Date.now();
   return result.toString();
}

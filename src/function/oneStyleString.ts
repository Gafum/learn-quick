export function oneStyleString(text: string): string {
   return text.replace(/\s+/g, "").toLocaleLowerCase();
}

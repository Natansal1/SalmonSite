export function isValidDate(date?: Date) {
   if (!date) return false;
   return !Number.isNaN(date.getTime());
}

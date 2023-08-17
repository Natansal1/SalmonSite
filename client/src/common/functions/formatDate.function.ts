export function formatDate(dateObject: Date): { date: string; time: string } {
   const date = dateObject
      .toLocaleDateString()
      .split("/")
      .map((val) => val.padStart(2, "0"))
      .join(".");

   const hours = dateObject.getHours().toString().padStart(2, "0");
   const minutes = dateObject.getMinutes().toString().padStart(2, "0");
   return { time: `${hours}:${minutes}`, date };
}

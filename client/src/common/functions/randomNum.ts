export function random(from: number, to: number, including: "both" | "start" | "end" = "both") {
   const randomNum = Math.random();

   switch (including) {
      case "both":
         return Math.floor(randomNum * (to - from + 1)) + from;
      case "start":
         return Math.floor(randomNum * (to - from)) + from;
      case "end":
         return Math.floor(randomNum * (to - from)) + from + 1;
   }
}

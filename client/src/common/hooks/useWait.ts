import { useTimeout } from ".";
import { retSwitch } from "../functions";

export function useWait() {
   const timeout = useTimeout();

   return function wait(time: number, type: "s" | "ms" | "m" | "h" = "ms") {
      const multiply = retSwitch(type)
         .case("h", () => 1000 * 60 * 60)
         .case("m", () => 1000 * 60)
         .case("s", () => 1000)
         .case("ms", () => 1)
         .done();

      return new Promise<string>((resolve) => {
         timeout.set(() => resolve(`waited ${time} milliseconds`), time * multiply);
      });
   };
}

export default useWait;

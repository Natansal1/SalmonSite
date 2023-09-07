import { useTimeout } from ".";

export function useWait() {
   const timeout = useTimeout();

   return function wait(time: number) {
      return new Promise<string>((resolve) => {
         timeout.set(() => resolve(`waited ${time} milliseconds`), time);
      });
   };
}

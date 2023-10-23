import { useEffect, useRef } from "react";
import { countLoop } from "../functions";

export function useTimeout() {
   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   const clearCallbackRef = useRef<((reason: "auto" | "manual") => void) | null>(null);

   useEffect(() => {
      return () => {
         autoClear();
      };
   }, []);

   function clear() {
      if (timeoutRef.current) {
         removeTimeout();
         if (clearCallbackRef.current) clearCallbackRef.current("manual");
      }
   }

   function autoClear() {
      if (timeoutRef.current) {
         removeTimeout();
         if (clearCallbackRef.current) clearCallbackRef.current("auto");
      }
   }

   function removeTimeout() {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
         timeoutRef.current = null;
      }
   }

   function set(callback: () => any, time: number, clearCallback?: (reason: "auto" | "manual") => void) {
      clear();
      timeoutRef.current = setTimeout(callback, time);
      clearCallbackRef.current = clearCallback ?? null;
   }

   return { clear, set };
}

export function useTimeouts(count: number) {
   return countLoop(count, useTimeout);
}

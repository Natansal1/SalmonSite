import React, { useEffect, useRef } from "react";

export function useTimeout() {
   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   useEffect(() => {
      return clear;
   }, []);

   function clear() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
   }

   function set(callback: () => any, time: number) {
      clear();
      timeoutRef.current = setTimeout(callback, time);
   }

   return { clear, set };
}

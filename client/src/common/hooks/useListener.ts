import { useEffect } from "react";

export function useWindowListener<T extends keyof WindowEventMap>(type: T, listener: (e: WindowEventMap[T]) => any) {
   useEffect(() => {
      window.addEventListener(type, listener);
      return () => window.removeEventListener(type, listener);
   }, []);
}

export function useDocumentListener<T extends keyof DocumentEventMap>(
   type: T,
   listener: (e: DocumentEventMap[T]) => any,
) {
   useEffect(() => {
      document.addEventListener(type, listener);
      return () => document.removeEventListener(type, listener);
   }, []);
}

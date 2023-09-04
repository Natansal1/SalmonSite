import { createContextHook } from "@hilma/tools";
import React, { createContext, useState } from "react";
import { ReactImageGalleryItem } from "react-image-gallery";
import FullScreenMedia from "../components/FullScreenMedia";
import { useWindowListener } from "../common/hooks";

const FullScreenContext = createContext<FullScreenContextValue | null>(null);

export const useFullscreenContext = createContextHook(FullScreenContext);

export type FullScreenContextValue = {
   enterFullscreen: (media: ReactImageGalleryItem[], index?: number, isPlaying?: boolean) => void;
   exitFullscreen: () => void;
   isFullscreen: boolean;
};

interface FullScreenContextProviderProps {
   children?: React.ReactNode;
}

const FullScreenContextProvider: React.FC<FullScreenContextProviderProps> = (props) => {
   const { children } = props;
   const [mediaProps, setMediaProps] = useState<{
      media?: ReactImageGalleryItem[];
      open: boolean;
      index?: number;
      isPlaying?: boolean;
   }>({
      open: false,
   });

   useWindowListener(
      "keydown",
      (e) => {
         if (e.key === "Escape" && mediaProps.open) {
            exitFullscreen();
            document.body.focus();
         }
      },
      [mediaProps.open],
   );

   function enterFullscreen(media: ReactImageGalleryItem[], index?: number, isPlaying?: boolean) {
      setMediaProps({
         media,
         isPlaying,
         open: true,
         index,
      });
   }

   function exitFullscreen() {
      setMediaProps({
         open: false,
      });
   }

   return (
      <FullScreenContext.Provider value={{ enterFullscreen, exitFullscreen, isFullscreen: mediaProps.open }}>
         <>{children}</>
         <FullScreenMedia
            {...mediaProps}
            onClose={exitFullscreen}
         />
      </FullScreenContext.Provider>
   );
};

export default FullScreenContextProvider;

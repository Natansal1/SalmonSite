import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { Media } from "../../common/types";
import clsx from "clsx";

import "react-image-gallery/styles/scss/image-gallery.scss";
import "../../styles/components/image-viewer.scss";

interface ImageViewerProps {
   media?: ({
      description?: string;
   } & Media)[];
   className?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
   const { media = [], className } = props;
   const galleryRef = useRef<ImageGallery | null>(null);
   const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

   useEffect(() => {
      function handleFullScreen() {
         if (document.fullscreenElement) setIsFullScreen(true);
         else setIsFullScreen(false);
      }

      document.addEventListener("fullscreenchange", handleFullScreen);
      return () => window.removeEventListener("fullscreenchange", handleFullScreen);
   }, []);

   const items: ReactImageGalleryItem[] = media.filterAndMap((image, index) => {
      if (image.type === "image" || image.type === "video") {
         return {
            original: image.src,
            thumbnail: image.src,
            description: image.description,
            loading: "lazy",
            originalAlt: `image-${index}`,
         };
      }
   });

   if (items.length === 0) return null;

   function handleFullScreenClick(isFullScreen: boolean) {
      isFullScreen ? galleryRef.current?.exitFullScreen() : galleryRef.current?.fullScreen();
      setIsFullScreen(!isFullScreen);
   }

   function handlePlayPauseClick(isPlaying: boolean) {
      isPlaying ? galleryRef.current?.pause() : galleryRef.current?.play();
   }

   return (
      <div className="page">
         <ImageGallery
            items={items}
            isRTL
            infinite
            thumbnailPosition="bottom"
            ref={galleryRef}
            showFullscreenButton
            autoPlay
            showPlayButton={items.length > 1}
            showBullets={items.length > 1}
            showThumbnails={items.length > 1}
            showIndex={items.length > 1}
            showNav={items.length > 1}
            slideDuration={300}
            slideInterval={2000}
            additionalClass={clsx(className, "image_gallery", {
               image_gallery_full_screen: isFullScreen,
               image_gallery_one: items.length === 1,
            })}
            renderFullscreenButton={(_e, isFullScreen) => (
               <IconButton
                  onClick={() => handleFullScreenClick(isFullScreen)}
                  className="control_button fullscreen_button"
               >
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
               </IconButton>
            )}
            renderPlayPauseButton={(_e, isPlaying) => (
               <IconButton
                  onClick={() => handlePlayPauseClick(isPlaying)}
                  className="control_button play_button"
               >
                  {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
               </IconButton>
            )}
         />
      </div>
   );
};

export default ImageViewer;

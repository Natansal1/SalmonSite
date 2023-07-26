import React, { useMemo, useRef } from "react";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import clsx from "clsx";
import { youtubeParser } from "../../common/functions";
import { Media } from "../../common/types";
import VideoComponent from "./VideoComponent";

import "react-image-gallery/styles/scss/image-gallery.scss";
import "../../styles/components/image-viewer.scss";

interface ImageViewerProps {
   media?: ({
      description?: string;
   } & Media)[];
   className?: string;
   showNav?: boolean;
   showPlayButton?: boolean;
   showBullets?: boolean;
   showThumbnails?: boolean;
   showIndex?: boolean;
   showFullscreenButton?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = (props) => {
   const {
      media = [],
      className,
      showBullets = true,
      showFullscreenButton = true,
      showIndex = true,
      showNav = true,
      showPlayButton = true,
      showThumbnails = true,
   } = props;
   const galleryRef = useRef<ImageGallery | null>(null);

   const items = useMemo<ReactImageGalleryItem[]>(
      () =>
         media
            .filter((image) => image.type !== "audio")
            .map((image, index) => {
               return {
                  original: image.src,
                  thumbnail:
                     image.type === "video"
                        ? `http://img.youtube.com/vi/${youtubeParser(image.src)}/0.jpg
               `
                        : image.src,
                  description: image.description,
                  loading: "lazy",
                  originalAlt: `image-${index}`,
                  renderItem:
                     image.type === "video"
                        ? (_item) => (
                             <VideoComponent
                                index={index}
                                src={image.src}
                                galleryRef={galleryRef}
                                description={image.description}
                             />
                          )
                        : undefined,
               };
            }),
      [media],
   );

   if (items.length === 0) return null;

   return (
         <ImageGallery
            items={items}
            onClick={() =>
               !document.fullscreenElement ? galleryRef.current?.fullScreen() : galleryRef.current?.exitFullScreen()
            }
            isRTL
            infinite
            thumbnailPosition="bottom"
            ref={galleryRef}
            showFullscreenButton={showFullscreenButton}
            autoPlay
            showPlayButton={showPlayButton && items.length > 1}
            showBullets={showBullets && items.length > 1}
            showThumbnails={showThumbnails && items.length > 1}
            showIndex={showIndex && items.length > 1}
            showNav={showNav && items.length > 1}
            slideDuration={300}
            slideInterval={3500}
            additionalClass={clsx(className, "image_gallery", {
               image_gallery_one: items.length === 1,
            })}
            renderFullscreenButton={(onClick, isFullScreen) => (
               <IconButton
                  onClick={onClick}
                  className="control_button fullscreen_button"
               >
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
               </IconButton>
            )}
            renderPlayPauseButton={(onClick, isPlaying) => (
               <IconButton
                  onClick={onClick}
                  className="control_button play_button"
               >
                  {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
               </IconButton>
            )}
         />
   );
};

export default ImageViewer;

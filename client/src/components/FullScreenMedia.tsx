import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { IconButton } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useTimeout, useWindowListener } from "../common/hooks";
import "../styles/components/fullscreen-media.scss";

interface FullScreenMediaProps {
   media?: ReactImageGalleryItem[];
   index?: number;
   open: boolean;
   onClose: () => void;
   isPlaying?: boolean;
}

const OPEN_VARIANT = { scale: 1, opacity: 1 };
const CLOSED_VARIANT = { scale: 0, opacity: 0 };

const FullScreenMedia: React.FC<FullScreenMediaProps> = (props) => {
   const { media = [], open, index = 0, onClose, isPlaying = true } = props;
   const [debouncedOpen, setDebouncedOpen] = useState<boolean>(open);
   const [showNav, setShowNav] = useState<boolean>(window.innerWidth > 600);
   const timeout = useTimeout();
   useWindowListener("resize", () => setShowNav(window.innerWidth > 600));

   useEffect(() => {
      if (open) setDebouncedOpen(true);
      else timeout.set(() => setDebouncedOpen(false), 200);
   }, [open]);

   if (!debouncedOpen) return null;

   return createPortal(
      <AnimatePresence>
         <motion.div
            className="fullscreen_media"
            animate={open ? "open" : "closed"}
            initial={CLOSED_VARIANT}
            exit={CLOSED_VARIANT}
            variants={{
               open: OPEN_VARIANT,
               closed: CLOSED_VARIANT,
            }}
         >
            <ReactImageGallery
               additionalClass="image_gallery_fullscreen"
               items={media}
               startIndex={index}
               onClick={onClose}
               isRTL
               infinite
               thumbnailPosition="bottom"
               autoPlay={isPlaying}
               showFullscreenButton
               showPlayButton
               showBullets
               showThumbnails
               showIndex
               showNav={showNav}
               slideDuration={300}
               slideInterval={4000 - Math.random() * 1000}
               renderFullscreenButton={() => (
                  <IconButton
                     onClick={onClose}
                     className="control_button fullscreen_button"
                     color="primary"
                  >
                     {<FullscreenExitIcon />}
                  </IconButton>
               )}
               renderPlayPauseButton={(onClick, isPlaying) => (
                  <IconButton
                     onClick={onClick}
                     className="control_button play_button"
                     color="primary"
                  >
                     {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                  </IconButton>
               )}
               renderLeftNav={(onClick, disabled) => (
                  <IconButton
                     onClick={onClick}
                     disabled={disabled}
                     className="image-gallery-icon image-gallery-left-nav"
                     color="primary"
                  >
                     <ArrowCircleLeftIcon />
                  </IconButton>
               )}
               renderRightNav={(onClick, disabled) => (
                  <IconButton
                     onClick={onClick}
                     disabled={disabled}
                     className="image-gallery-icon image-gallery-right-nav"
                     color="primary"
                  >
                     <ArrowCircleRightIcon />
                  </IconButton>
               )}
            />
         </motion.div>
      </AnimatePresence>,
      document.body,
   );
};

export default FullScreenMedia;

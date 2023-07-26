import React, { useState } from "react";
import YouTube from "react-youtube";
import ImageGallery from "react-image-gallery";
import { youtubeParser } from "../../common/functions";

interface VideoComponentProps {
   src: string;
   galleryRef: React.MutableRefObject<ImageGallery | null>;
   description?: string;
}

const VideoComponent: React.FC<VideoComponentProps> = (props) => {
   const { src, description, galleryRef } = props;
   const [descEnables, setDescEnabled] = useState<boolean>(true);

   const videoId = youtubeParser(src);

   if (videoId == false) return null;

   return (
      <div
         className="video_component_container image-gallery-image"
         onClick={() =>
            !document.fullscreenElement ? galleryRef.current?.fullScreen() : galleryRef.current?.exitFullScreen()
         }
      >
         <YouTube
            videoId={videoId}
            onPlay={() => {
               galleryRef.current?.pause();
               setDescEnabled(false);
            }}
            onPause={() => {
               galleryRef.current?.play();
               setDescEnabled(true);
            }}
            onEnd={() => galleryRef.current?.play()}
            opts={{
               height: "null",
               width: "null",
               allowfullscreen: "0",
               playerVars: {
                  allowfullscreen: "0",
                  autoplay: 1,
                  fullScreen: 0,
               },
               allow: {
                  fullScreen: "0",
               },
            }}
            className="iframe_container"
         />
         {description && descEnables && (
            <span className="image-gallery-description video_gallery_description">{description}</span>
         )}
      </div>
   );
};

export default VideoComponent;

import React, { useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import ImageGallery from "react-image-gallery";
import { youtubeParser } from "../../common/functions";

interface VideoComponentProps {
   src: string;
   galleryRef: React.MutableRefObject<ImageGallery | null>;
   description?: string;
   index: number;
}

const VideoComponent: React.FC<VideoComponentProps> = (props) => {
   const { src, description, galleryRef, index } = props;
   const [playing, setPlaying] = useState<boolean>(true);
   const playerRef = useRef<YouTubeEvent | null>(null);

   const videoId = youtubeParser(src);

   if (videoId == false) return null;

   if (index !== galleryRef.current?.getCurrentIndex()) {
      try {
         playerRef.current?.target?.pauseVideo();
      } catch {}
   }

   return (
      <div
         className="video_component_container image-gallery-image"
         onClick={() =>
            !document.fullscreenElement ? galleryRef.current?.fullScreen() : galleryRef.current?.exitFullScreen()
         }
      >
         <YouTube
            onReady={(e) => {
               playerRef.current = e;
            }}
            videoId={videoId}
            onPlay={() => {
               galleryRef.current?.pause();
               setPlaying(true);
            }}
            onPause={() => {
               galleryRef.current?.play();
               setPlaying(false);
            }}
            onEnd={() => galleryRef.current?.play()}
            opts={{
               height: "null",
               width: "null",
               playerVars: {
                  autoplay: 0,
               },
            }}
            className="iframe_container"
         />
         {description && !playing && (
            <span className="image-gallery-description video_gallery_description">{description}</span>
         )}
      </div>
   );
};

export default VideoComponent;

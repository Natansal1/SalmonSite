import React, { useEffect, useState } from "react";
import axios from "axios";

interface YouTubeThumbnailProps {
   videoId: string;
}

const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = (props) => {
   const { videoId } = props;
   const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

   useEffect(() => {
      const fetchThumbnail = async () => {
         try {
            const thumbnailUrl = await getYouTubeThumbnailUrl(videoId);
            setThumbnailUrl(thumbnailUrl);
         } catch (error) {
            console.error("Error fetching YouTube thumbnail:", error);
         }
      };

      fetchThumbnail();
   }, [videoId]);

   const getYouTubeThumbnailUrl = async (videoId: string): Promise<string> => {
      const url = `https://img.youtube.com/vi/${videoId}/maxres`;
      const response = await axios.get(url);

      if (response.status === 200) {
         return url;
      } else {
         throw new Error("Failed to fetch YouTube thumbnail.");
      }
   };

   if (!thumbnailUrl) {
      // You can show a loading indicator here while fetching the thumbnail.
      return <div>Loading thumbnail...</div>;
   }

   return (
      <img
         src={thumbnailUrl}
         alt="YouTube Thumbnail"
         className="image-gallery-thumbnail-image"
      />
   );
};

export default YouTubeThumbnail;

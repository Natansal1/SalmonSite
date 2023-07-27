import React from "react";
import { StoryType } from "../common/types/ServerTypes/Story.type";
import "../styles/pages/congrats.style.scss";
import ImageViewer from "./ImageViewer/ImageViewer";

interface StoryProps {
   story: StoryType;
}

const CongratsItem: React.FC<StoryProps> = (props) => {
   const { _id, title, media, content, members, presentedDate } = props.story;

   return (
      <div className="congrats_container">
         <div className="text_container">
            <h2 className="story_title">{title}</h2>
            <div>{content}</div>
            <button className="more_button">קרא עוד</button>
         </div>

         <ImageViewer
            className={`images ${media.length === 1 && "one_photo"}`}
            media={media}
            showBullets={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            showIndex={false}
         />
      </div>
   );
};

export default CongratsItem;

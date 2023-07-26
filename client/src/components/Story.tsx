import React from "react";
import { StoryType } from "../common/types/ServerTypes/Story.type";
import "../styles/components/story.style.scss";
import ImageViewer from "./ImageViewer/ImageViewer";
interface StoryProps {
   story: StoryType;
}
const colorSet = ['#6eb9cf', '#6dc79c', '#FFFF66',  '#FF33B5'];


const Story: React.FC<StoryProps> = (props) => {
   const { _id, title, media, content, members, presentedDate } = props.story;

   function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colorSet.length);
    return colorSet[randomIndex];
  }

   return (
      <div className="story_container" style={{borderColor: getRandomColor()}}>
         <div className="text_container">
            <h2 className="story_title">{title}</h2>
            <div>{content}</div>
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

export default Story;

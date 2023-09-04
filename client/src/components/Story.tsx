import React from "react";
import { StoryType } from "../common/types/ServerTypes/Story.type";
import ImageViewer from "./ImageViewer/ImageViewer";
import "../styles/pages/story.style.scss";
import { Grid } from "@mui/material";
import { formatDate } from "../common/functions";
interface StoryProps {
   story: StoryType;
}
const RANDOM_COLOR_SET = ["#6eb9cf", "#6dc79c", "#FFFF66", "#FF33B5"];

const Story: React.FC<StoryProps> = (props) => {
   const { _id, title, media, content, members, presentedDate } = props.story;

   function getRandomColor() {
      const randomIndex = Math.floor(Math.random() * RANDOM_COLOR_SET.length);
      return RANDOM_COLOR_SET[randomIndex];
   }

   const formattedDate = presentedDate ? formatDate(new Date(presentedDate)) : undefined;

   return (
      <Grid
         className="story_container"
         style={{ borderColor: getRandomColor() }}
         item
         xs
      >
         <div className="text_container">
            <h2 className="story_title">
               {title}
               {presentedDate && <span className="story_date">{}</span>}
            </h2>
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
      </Grid>
   );
};

export default Story;

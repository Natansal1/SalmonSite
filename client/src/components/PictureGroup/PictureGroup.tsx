import React from "react";
import { Media } from "../../common/types";
import ImageViewer from "../ImageViewer/ImageViewer";
import { formatDate } from "../../common/functions";
import { useUserContext } from "../../contexts/UserContextProvider.context";

import "../../styles/components/picture-group.scss";

type PictureGroupProps = {
   media: Media[];
   title: string;
   presentedDate?: Date;
};

const PictureGroup: React.FC<PictureGroupProps> = (props) => {
   const { media, title, presentedDate } = props;
   const { isMobile } = useUserContext();
   return (
      <div className="picture_group">
         <h2 className="picture_group_title">{title}</h2>
         {presentedDate && <h3 className="picture_group_date">{formatDate(presentedDate).date}</h3>}
         <ImageViewer
            media={media}
            showThumbnails={!isMobile}
         />
      </div>
   );
};

export default PictureGroup;

import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import clsx from "clsx";

import "../styles/components/image-card.scss";

interface ImageCardProps {
   onClick?: () => void;
   src: string;
   alt?: string;
   text: string;
   subtext?: string;
   className?: string;
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
   const { src, text, alt, subtext, className, onClick, ...otherProps } = props;
   return (
      <Card
         className={clsx("image_card", className)}
         {...otherProps}
      >
         <CardActionArea
            className="card_action"
            onClick={onClick}
         >
            <div
               className="image_card_image"
               style={{ backgroundImage: `url(${src})` }}
            />
            <CardContent className="card_content">
               <Typography
                  variant="h5"
                  component="span"
                  className="card_title"
               >
                  {text}
               </Typography>
               {subtext && <span className="card_subtitle">{subtext}</span>}
            </CardContent>
         </CardActionArea>
      </Card>
   );
};

export default ImageCard;

import React from "react";
import { UpdateEvent } from "../../common/types";
import { countLoop, formatDate, random } from "../../common/functions";
import clsx from "clsx";
import { Grid } from "@mui/material";

interface UpdateInstanceProps {
   update: UpdateEvent;
}

const UpdateInstance: React.FC<UpdateInstanceProps> = (props) => {
   const {
      update: { start, title, end, url },
   } = props;

   const startFormat = formatDate(start);
   const endFormat = end ? formatDate(end) : undefined;

   let dateString = endFormat ? `${endFormat.date} - ${startFormat.date}` : startFormat.date;

   const randomBg = `rgba(255,${countLoop(2, () => random(0, 255)).join()}, 0.1)`;

   return (
      <Grid
         className="update_instance"
         item
         xs
         sx={{ backgroundColor: randomBg }}
      >
         <span className="update_time">{dateString}</span>
         <a
            className={clsx("update_link", {
               update_link_clickable: Boolean(url),
            })}
            href={url}
         >
            {title}
         </a>
      </Grid>
   );
};

export default UpdateInstance;

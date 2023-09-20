import React from "react";
import { Grid, SxProps } from "@mui/material";
import clsx from "clsx";
import { countLoop, formatDate, random } from "../../common/functions";
import { UpdateEvent } from "../../common/types";

interface UpdateInstanceProps {
   update: UpdateEvent;
   sx?: SxProps;
}

const UpdateInstance: React.FC<UpdateInstanceProps> = (props) => {
   const {
      update: { start, title, end, url },
      sx,
   } = props;

   const startFormat = formatDate(start);
   const endFormat = end ? formatDate(end) : undefined;

   let dateString = endFormat ? `${endFormat.date} - ${startFormat.date}` : startFormat.date;

   const randomBg = `rgba(${countLoop(3, () => random(0, 200)).join()}, 0.4)`;

   return (
      <Grid
         className="update_instance"
         item
         sx={{ backgroundColor: randomBg, ...sx }}
         xs
      >
         <span className="update_time">{dateString}</span>
         <a
            className={clsx("update_link", {
               update_link_clickable: Boolean(url),
            })}
            href={url}
            target={url?.startsWith("/") ? undefined : "_"}
         >
            {title}
         </a>
      </Grid>
   );
};
export default UpdateInstance;

import React from "react";
import { UpdateEvent } from "../../common/types";
import { formatDate } from "../../common/functions";
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

   let dateString = endFormat ? `${startFormat.date} - ${endFormat.date}` : startFormat.date;

   return (
      <Grid
         className="update_instance"
         item
         xs
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

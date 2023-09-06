import React from "react";
import { UpdateEvent } from "../../common/types";
import UpdateInstance from "./UpdateInstance";
import { Grid } from "@mui/material";
import "../../styles/components/updates-board.scss";

const UpdatesBoard: React.FC = () => {
   const events: UpdateEvent[] = [
      {
         start: new Date(),
         title: "בדיקה תאריך פתיחה בלבד",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סגירה ופתיחה",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סגירה ופתיחה",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה קישור",
         url: "/pictures",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סופר דופר ארוךksldfk l;sdkflk kasdkflj alkdjskl ;lsjkdflk poljasdkfln alkdjsflk",
      },
      {
         start: new Date(),
         title: "בדיקה תאריך פתיחה בלבד",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סגירה ופתיחה",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סגירה ופתיחה",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה קישור",
         url: "/pictures",
      },
      {
         start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
         end: new Date(),
         title: "בדיקה סופר דופר ארוךksldfk l;sdkflk kasdkflj alkdjskl ;lsjkdflk poljasdkfln alkdjsflk",
      },
   ];

   return (
      <div className="updates_board">
         <div className="updates_container">
            <Grid
               className="updates_list"
               container
               gap={1}
            >
               {events.map((event, index) => (
                  <UpdateInstance
                     update={event}
                     key={event.title + index}
                  />
               ))}
            </Grid>
         </div>
      </div>
   );
};

export default UpdatesBoard;

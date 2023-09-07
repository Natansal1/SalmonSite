import React from "react";
import { UpdateEvent } from "../../common/types";
import UpdateInstance from "./UpdateInstance";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/enums";
import axios from "axios";
import LoadingText from "./LoadingText";
import "../../styles/components/updates-board.scss";

const UpdatesBoard: React.FC = () => {
   const { data: events } = useQuery({
      queryKey: [queryKeys.UPDATE_EVENTS],
      queryFn: async () => {
         const month = new Date().getMonth() + 1;
         const year = new Date().getFullYear();
         const start = new Date(`${month}/01/${year}`);
         const end = month === 12 ? new Date(`01/01/${year + 1}`) : new Date(`${month + 1}/01/${year}`);
         end.setDate(end.getDate() - 1);
         const { data } = await axios.get<UpdateEvent[]>("/api/update-event", {
            params: {
               start,
               end,
            },
         });
         return data;
      },
      select: (data) =>
         data
            .map((val) => ({
               ...val,
               start: new Date(val.start),
               end: val.end ? new Date(val.end) : undefined,
            }))
            .sort((a, b) => b.start.getTime() - a.start.getTime()),
      retry: (failCount) => failCount <= 10,
   });

   return (
      <div className="updates_board">
         <div className="updates_container">
            <Grid
               className="updates_list"
               container
               gap={1}
               justifyContent="space-evenly"
               direction="row"
            >
               {events === undefined ? (
                  <LoadingText />
               ) : events.length === 0 ? (
                  <span className="no_events">
                     <span>☀️</span>אין חדש תחת השמש<span>☀️</span>
                  </span>
               ) : (
                  events.map((event, index) => (
                     <UpdateInstance
                        update={event}
                        key={event.title + index}
                        sx={
                           events.length < 7
                              ? {
                                   height: "fit-content",
                                }
                              : undefined
                        }
                     />
                  ))
               )}
            </Grid>
         </div>
      </div>
   );
};

export default UpdatesBoard;

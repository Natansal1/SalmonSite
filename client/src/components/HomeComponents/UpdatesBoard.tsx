import React from "react";
import "../../styles/components/updates-board.scss";

export type UpdateEvent = {
   start: Date;
   end?: Date; //defaults to one day
   title: string;
   allDay?: boolean; //defaults to false
   categories?: string[];
   url?: string;
};

const UpdatesBoard: React.FC = () => {
   const events: UpdateEvent[] = [];

   return <div className="updates_board">sdfsdfsfd</div>;
};

export default UpdatesBoard;

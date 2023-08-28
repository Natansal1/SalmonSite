import clsx from "clsx";
import React from "react";

export interface StarProps {
   size: "small" | "medium" | "large";
   top: number;
   left: number;
}

const Star: React.FC<StarProps> = (props) => {
   const { size, left, top } = props;
   return (
      <div
         className={clsx("star", size)}
         style={{
            top: `${top}px`,
            left: `${left}px`,
         }}
      />
   );
};

export default Star;

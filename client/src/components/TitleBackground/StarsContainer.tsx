import React, { useMemo } from "react";
import clsx from "clsx";
import Star, { StarProps } from "./Star";
interface StarsContainerProps {
   count: number;
   size: StarProps["size"];
   className?: string;
   containerRect: DOMRect | undefined;
}

const StarsContainer: React.FC<StarsContainerProps> = (props) => {
   const { className, count, size, containerRect } = props;

   const stars = useMemo(() => {
      const arr: React.ReactNode[] = [];
      if (!containerRect) return arr;

      const relativeWidth = containerRect.width / count;
      const relativeHeight = containerRect.height / count;

      const orderArr = new Array(count)
         .fill(0)
         .map((_val, index) => index)
         .sort(() => Math.random() - 0.5);

      for (let i = 0; i < count; i++) {
         arr.push(
            <Star
               size={size}
               key={`star_${i}_${size}`}
               left={relativeWidth * i + Math.random() * relativeWidth}
               top={relativeHeight * orderArr[i] + Math.random() * relativeHeight}
            />,
         );
      }
      return arr;
   }, [count, containerRect?.width, containerRect?.height]);

   return (
      <>
         <div className={clsx("star_container", size, className)}>{stars}</div>
         <div className={clsx("star_container star_container_second", size, className)}>{stars}</div>
      </>
   );
};

export default StarsContainer;

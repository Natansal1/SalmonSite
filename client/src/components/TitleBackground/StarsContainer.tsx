import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Star, { StarProps } from "./Star";

interface StarsContainerProps {
   count: number;
   size: StarProps["size"];
   className?: string;
   containerRect: DOMRect | undefined;
   randomize: boolean;
}

const StarsContainer: React.FC<StarsContainerProps> = (props) => {
   const { className, count, size, containerRect, randomize } = props;
   const [forceUpdate, setForceUpdate] = useState<boolean>(false);
   const interval = useRef<ReturnType<typeof setInterval>>();

   useEffect(() => {
      clearInterval(interval.current);

      if (!randomize) return;

      interval.current = setInterval(() => {
         setForceUpdate((prev) => !prev);
      }, 10);

      return () => clearInterval(interval.current);
   }, [randomize]);

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
   }, [count, containerRect?.width, containerRect?.height, forceUpdate]);

   return (
      <>
         <div className={clsx("star_container", size, className)}>{stars}</div>
         <div className={clsx("star_container star_container_second", size, className)}>{stars}</div>
      </>
   );
};

export default StarsContainer;

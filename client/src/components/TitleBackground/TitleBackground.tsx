import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useWindowListener } from "../../common/hooks";
import StarsContainer from "./StarsContainer";
import { StarProps } from "./Star";
import "../../styles/components/stars-background.scss";

interface TitleBackgroundProps extends Omit<React.HTMLProps<HTMLDivElement>, "ref"> {
   counts?: Record<StarProps["size"], number>;
   randomize?: boolean;
}

const sizes: StarProps["size"][] = ["small", "medium", "large"];

const TitleBackground: React.FC<TitleBackgroundProps> = (props) => {
   const { randomize = false, children, className, counts = { large: 10, medium: 20, small: 30 }, ...rest } = props;
   const [rect, setRect] = useState<DOMRect>();
   const containerRef = useRef<HTMLDivElement | null>(null);

   useWindowListener("resize", () => {
      if (containerRef.current) setRect(containerRef.current.getBoundingClientRect());
   });

   return (
      <div
         className={clsx("title_background", className)}
         ref={(ref) => {
            containerRef.current = ref;
            if (!ref) return;
            const newRect = ref.getBoundingClientRect();
            if (newRect.width !== rect?.width || newRect.height !== rect.height) setRect(newRect);
         }}
         {...rest}
      >
         {sizes.map((size, index) => (
            <StarsContainer
               size={size}
               containerRect={rect}
               count={counts[size]}
               randomize={randomize}
               key={size + index}
            />
         ))}
         {children}
      </div>
   );
};

export default TitleBackground;

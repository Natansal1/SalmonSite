import React, { useState } from "react";
import clsx from "clsx";
import { useWindowListener } from "../common/hooks";
import { useUserContext } from "../contexts/UserContextProvider.context";
import TitleBackground from "./TitleBackground/TitleBackground";
import { StarProps } from "./TitleBackground/Star";
import ReturnButton from "./ReturnButton";
import "../styles/components/title.scss";
import { LordIconTrigger } from "../common/types/lord-icons.type";

interface TitleProps {
   subtitle?: string;
   className?: string;
   children: React.ReactNode;
   showReturn?: boolean;
   lordIcon?: {
      src: string;
      trigger: LordIconTrigger;
      colors: string;
      delay?: number;
      style?: React.HTMLAttributes<HTMLElement>["style"];
   };
}

function calcStarCount() {
   const width = window.innerWidth;
   const small = Math.max(Math.floor(width / 40), 15);
   const medium = Math.floor((small * 2) / 3);
   const large = Math.floor(small / 3);

   return {
      small,
      medium,
      large,
   };
}

const Title: React.FC<TitleProps> = (props) => {
   const { children, subtitle, className, showReturn, lordIcon } = props;
   const [starCount, setStarCount] = useState<Record<StarProps["size"], number>>(calcStarCount);
   const { isMobile } = useUserContext();

   useWindowListener("resize", () => setStarCount(calcStarCount));

   return (
      <div className="title_container">
         <TitleBackground
            className={clsx(className, "title")}
            counts={starCount}
         >
            {showReturn && !isMobile && <ReturnButton />}
            <h1>
               {children}
               {lordIcon && (
                  <lord-icon
                     src={lordIcon.src}
                     trigger={lordIcon.trigger}
                     delay={lordIcon.delay}
                     colors={lordIcon.colors}
                     style={{ height: "100px", width: "100px", ...lordIcon.style }}
                  />
               )}
            </h1>
            {subtitle && <h2>{subtitle}</h2>}
         </TitleBackground>
      </div>
   );
};

export default Title;

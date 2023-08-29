import React, { useState } from "react";
import clsx from "clsx";
import { useWindowListener } from "../common/hooks";
import { useUserContext } from "../contexts/UserContextProvider.context";
import TitleBackground from "./TitleBackground/TitleBackground";
import { StarProps } from "./TitleBackground/Star";
import ReturnButton from "./ReturnButton";
import "../styles/components/title.scss";

interface TitleProps {
   subtitle?: string;
   className?: string;
   children: React.ReactNode;
   showReturn?: boolean;
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
   const { children, subtitle, className, showReturn } = props;
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
            <h1>{children}</h1>
            {subtitle && <h2>{subtitle}</h2>}
         </TitleBackground>
      </div>
   );
};

export default Title;

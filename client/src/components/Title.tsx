import React, { useState } from "react";
import TitleBackground from "./TitleBackground/TitleBackground";
import clsx from "clsx";
import "../styles/components/title.scss";
import { useTimeout } from "../common/hooks";

interface TitleProps {
   subtitle?: string;
   className?: string;
   children: React.ReactNode;
}

const Title: React.FC<TitleProps> = (props) => {
   const { children, subtitle, className } = props;
   const [randomizing, setRandomizing] = useState<boolean>(false);
   const timeout = useTimeout();

   function handleClick() {
      setRandomizing(true);
      timeout.set(() => setRandomizing(false), 1000);
   }

   return (
      <div className="title_container">
         <TitleBackground
            className={clsx(className, "title")}
            onClick={handleClick}
            randomize={randomizing}
            style={{
               transform: randomizing ? "scale(1.1)" : "scale(1)",
               transition: "0.1s",
               filter: randomizing ? "brightness(150%)" : "brightness(100%)",
            }}
         >
            <h1>{children}</h1>
            {subtitle && <h2>{subtitle}</h2>}
         </TitleBackground>
      </div>
   );
};

export default Title;

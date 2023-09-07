import React, { useEffect, useState } from "react";
import { countLoop } from "../../common/functions";

const LoadingText: React.FC = () => {
   const [dots, setDots] = useState<number>(1);

   useEffect(() => {
      const interval = setInterval(() => setDots((prev) => (prev % 3) + 1), 500);
      return () => clearInterval(interval);
   }, []);

   return <span className="loading_text no_events">טוען{countLoop(dots, () => ".").join("")}</span>;
};

export default LoadingText;

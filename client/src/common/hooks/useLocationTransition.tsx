import React, { useEffect, useState } from "react";
import { usePageLocationContext, DEFAULT_LOCATION_DELAY } from "../../contexts/PageLocationContextProvider";

export type TransitionState = { animation?: string };

const ENTER_ANIMATION = {
   animation: `fade-in ${DEFAULT_LOCATION_DELAY}ms ease forwards`,
};

const LEAVE_ANIMATION = {
   animation: `fade-out ${DEFAULT_LOCATION_DELAY}ms ease forwards`,
};

function useLocationTransition() {
   const { displayLocation } = usePageLocationContext();
   const [animation, setAnimation] = useState<TransitionState>(
      displayLocation.pathname === location.pathname ? ENTER_ANIMATION : LEAVE_ANIMATION,
   );

   function handleLocationChange() {
      if (displayLocation.state && typeof displayLocation.state === "object" && displayLocation.state.delay === false) {
         setAnimation({});
      } else setAnimation(displayLocation.pathname === location.pathname ? ENTER_ANIMATION : LEAVE_ANIMATION);
   }

   useEffect(() => {
      handleLocationChange();
   }, [location.pathname, displayLocation.pathname]);

   return animation;
}

export default useLocationTransition;

import { createContextHook } from "@hilma/tools";
import React, { useEffect, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import { useTimeout } from "../common/hooks";

export type LocationContextValue = {
   displayLocation: Location;
};

const LocationContext = React.createContext<LocationContextValue | null>(null);
LocationContext.displayName = "location-context";
export const usePageLocationContext = createContextHook(LocationContext);

interface PageLocationContextProviderProps {
   children: React.ReactNode;
}

export const DEFAULT_LOCATION_DELAY = 150;

const PageLocationContextProvider: React.FC<PageLocationContextProviderProps> = (props) => {
   const { children } = props;
   const location = useLocation();
   const timeout = useTimeout();
   const [displayLocation, setDisplayLocation] = useState(location);

   useEffect(() => {
       if (location.state && typeof location.state === "object" && location.state.delay === false) {
         setDisplayLocation(location);
      } else {
         timeout.set(() => {
            setDisplayLocation(location);
         }, DEFAULT_LOCATION_DELAY);
      }
   }, [location.pathname]);

   return <LocationContext.Provider value={{ displayLocation }}>{children}</LocationContext.Provider>;
};

export default PageLocationContextProvider;

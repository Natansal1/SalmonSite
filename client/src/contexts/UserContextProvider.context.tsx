import React, { useState } from "react";
import { createContextHook } from "@hilma/tools";
import { DisplayMode } from "../common/types";
import { DISPLAY_MODE_KEY, MAX_MOBILE_WIDTH } from "../common/constants";

export type UserContextValue = {
   displayMode: DisplayMode;
   loggedIn: boolean;

   toggleDisplayMode: () => void;
   isMobile: () => boolean;
};

const UserContext = React.createContext<UserContextValue | null>(null);
UserContext.displayName = "user-context";
export const useUserContext = createContextHook(UserContext);

interface UserContextProviderProps {
   children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
   const [displayMode, setDisplayMode] = useState<DisplayMode>(getDisplayModeFromLocalStorage);
   const [loggedIn, setLoggedIn] = useState<boolean>(false);

   function getDisplayModeFromLocalStorage() {
      const displayMode = localStorage.getItem(DISPLAY_MODE_KEY);
      if (!displayMode) return "light";
      return displayMode as DisplayMode;
   }

   function toggleDisplayMode() {
      setDisplayMode((prev) => (prev === "light" ? "dark" : "light"));
   }

   function isMobile() {
      return window.innerWidth <= MAX_MOBILE_WIDTH;
   }

   const { children } = props;
   return (
      <UserContext.Provider value={{ displayMode, loggedIn, toggleDisplayMode, isMobile }}>
         {children}
      </UserContext.Provider>
   );
};

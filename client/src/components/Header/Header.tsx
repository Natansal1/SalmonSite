import { AppBar } from "@mui/material";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import "../../styles/components/header.scss";

export const HEADER_MOBILE_START_WIDTH = 950;

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
   const {} = props;

   return (
      <AppBar
         className="header"
         color="inherit"
         variant="elevation"
      >
         <img
            className="header_icon"
            src="/images/salmon-logo.png"
            alt="אתר משפחת שלמון"
         />
         <HeaderLinks />
      </AppBar>
   );
};

export default Header;

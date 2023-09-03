import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, IconButton } from "@mui/material";
import { PAGES_ORDER } from "../../common/constants";
import { Page } from "../../common/types";
import { HEADER_MOBILE_START_WIDTH } from "./Header";
import HeaderLink from "./HeaderLink";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../SettingsMenu";
import HeaderSearch from "./HeaderSearch";

const HeaderLinks: React.FC = () => {
   const location = useLocation();
   const [active, setActive] = useState<Page | null>(getActivePage);
   const [sliderStyle, setDivSlider] = useState<{ left: number; width: number } | null>(null);
   const [isMenu, setIsMenu] = useState<boolean>(isDisplayInMenu);
   const [drawOpen, setDrawOpen] = useState<boolean>(false);

   const navigate = useNavigate();

   function isDisplayInMenu() {
      return window.innerWidth <= HEADER_MOBILE_START_WIDTH;
   }

   useEffect(() => {
      function handleResize() {
         setSlider(active);
         setIsMenu(isDisplayInMenu);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   });

   useEffect(() => {
      const activePage = getActivePage();
      setActive(activePage);
      setSlider(activePage);
   }, [location.pathname]);

   function getActivePage(): Page | null {
      const pathname = location.pathname;
      if (location.pathname === "/") return "home";
      const page = pathname.split("/").filter(Boolean)[0];
      return PAGES_ORDER.find((val) => val === page) ?? null;
   }

   function handleClick(page: Page) {
      navigate(`/${page === "home" ? "" : page}`);
      setSlider(page);
   }

   function setSlider(page: Page | null) {
      if (!page) return setDivSlider(null);
      const selected = document.querySelector(`[data-page='${page}']`);
      if (!selected) return setDivSlider(null);
      const { width, left } = selected.getBoundingClientRect();
      setDivSlider({ left, width });
   }

   const links = PAGES_ORDER.map((page, index) => (
      <React.Fragment key={page}>
         <HeaderLink
            isMenu={isMenu}
            page={page}
            active={active === page}
            onClick={handleClick}
         />
         {isMenu && index !== PAGES_ORDER.length - 1 && (
            <Divider
               variant="middle"
               className="divider"
            />
         )}
      </React.Fragment>
   ));

   return (
      <>
         <div className="header_links">
            {isMenu ? (
               <HeaderMenu
                  open={drawOpen}
                  onDrawChange={setDrawOpen}
               >
                  {links}
               </HeaderMenu>
            ) : (
               links
            )}
            {isMenu && <h1 className="header_title">אתר משפחת שלמון</h1>}
            {!isMenu && sliderStyle && (
               <div
                  className="bottom_header_line"
                  style={sliderStyle}
               />
            )}
         </div>
         {isMenu && (
            <IconButton
               onClick={() => setDrawOpen(true)}
               className="draw_open_icon draw_icon"
            >
               <MenuIcon />
            </IconButton>
         )}
         <HeaderSearch />
         <UserAvatar isMenu={isMenu} />
      </>
   );
};

export default HeaderLinks;

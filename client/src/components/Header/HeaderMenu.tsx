import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserAvatar from "../SettingsMenu";

interface HeaderMenuProps {
   children: React.ReactNode;
   open: boolean;
   onDrawChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {
   const { children, onDrawChange, open } = props;

   return (
      <>
         <Drawer
            onClose={() => onDrawChange(false)}
            open={open}
            anchor="right"
            className="header_draw"
            PaperProps={{ className: "draw_paper" }}
         >
            <div className="menu_top_buttons_container">
               <IconButton
                  className="draw_close_icon draw_icon"
                  onClick={() => onDrawChange(false)}
               >
                  <CloseIcon />
               </IconButton>
               <UserAvatar
                  isMenu
                  openOnMenu
               />
            </div>
            <div className="header_links_draw">{children}</div>
         </Drawer>
      </>
   );
};

export default HeaderMenu;

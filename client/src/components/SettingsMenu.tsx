import React, { useState } from "react";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useUserContext } from "../contexts/UserContextProvider.context";
import SettingsIcon from "@mui/icons-material/Settings";

interface UserAvatarProps {
   isMenu: boolean;
   openOnMenu?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
   const { isMenu, openOnMenu = false } = props;
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const [anchorElm, setAnchorElm] = useState<Element | null>(null);
   const { loggedIn, displayMode, toggleDisplayMode } = useUserContext();

   if (isMenu !== openOnMenu) return null;

   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      setMenuOpen((prev) => !prev);
      setAnchorElm(e.currentTarget);
   }

   function handleLoginOutClick() {
      if (loggedIn) {
      } else {
      }
   }

   return (
      <>
         <IconButton
            onClick={handleClick}
            className="login_header_button"
         >
            <SettingsIcon
               color="secondary"
               fontSize="large"
            />
         </IconButton>
         <Menu
            open={menuOpen}
            anchorEl={anchorElm}
            onClose={() => setMenuOpen(false)}
            className="menu"
         >
            <MenuItem
               onClick={toggleDisplayMode}
               className="menu_item"
            >
               {displayMode === "light" ? "מצב לילה" : "מצב יום"}
            </MenuItem>
            <Divider className="divider" />
            <MenuItem
               onClick={handleLoginOutClick}
               className="menu_item"
            >
               {loggedIn ? "התנתק/י" : "התחבר/י"}
            </MenuItem>
         </Menu>
      </>
   );
};

export default UserAvatar;

import React from "react";
import { Button } from "@mui/material";
import { Page } from "../../common/types";
import { PAGES } from "../../common/constants";
import clsx from "clsx";

//icons:

//home
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
//congrats
import RedeemIcon from "@mui/icons-material/Redeem";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";

//occasions
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CakeTwoToneIcon from "@mui/icons-material/CakeTwoTone";

//pictures
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CameraAltTwoToneIcon from "@mui/icons-material/CameraAltTwoTone";

//origin
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";

//stories
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";

const ICONS: Record<Page, { active: React.ReactNode; not_active: React.ReactNode }> = {
   home: {
      active: <HomeTwoToneIcon key="active_home" />,
      not_active: <HomeOutlinedIcon key="nonactive_home" />,
   },
   congrats: {
      active: <RedeemTwoToneIcon key="active_congrats" />,
      not_active: <RedeemIcon key="nonactive_congrats" />,
   },
   occasions: {
      active: <CakeTwoToneIcon key="active_occasions" />,
      not_active: <CakeOutlinedIcon key="nonactive_occasions" />,
   },
   pictures: {
      active: <CameraAltTwoToneIcon key="active_picture" />,
      not_active: <CameraAltOutlinedIcon key="nonactive_picture" />,
   },
   origin: {
      active: <AccessTimeTwoToneIcon key="active_origin" />,
      not_active: <AccessTimeOutlinedIcon key="nonactive_origin" />,
   },
   stories: {
      active: <AutoStoriesTwoToneIcon key="active_stories" />,
      not_active: <AutoStoriesOutlinedIcon key="nonactive_stories" />,
   },
};

interface HeaderLinkProps {
   page: Page;
   active: boolean;
   onClick: (page: Page) => void;
   isMenu: boolean;
}

const HeaderLink: React.FC<HeaderLinkProps> = (props) => {
   const { page, active, onClick, isMenu } = props;

   return (
      <Button
         className={clsx("header_link", { header_link_active: active })}
         color={active ? "primary" : "secondary"}
         onClick={() => onClick(page)}
         data-page={page}
      >
         {PAGES[page]}
         {!isMenu && (active ? ICONS[page].active : ICONS[page].not_active)}
      </Button>
   );
};

export default HeaderLink;

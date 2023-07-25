import React from "react";
import { COMPONENT_MAPPER, TABLET_ORDER, PC_MOBILE_ORDER } from "../../common/constants";
import { ImageListItem } from "@mui/material";
import { Size } from "./Home";
import { MySwitch } from "../../common/functions/SwitchCaseToVal";

interface HomeComponentsProps {
   size: Size;
}

const HomeComponents: React.FC<HomeComponentsProps> = (props) => {
   const { size } = props;
   const arrToMap = size === "tablet" ? TABLET_ORDER : PC_MOBILE_ORDER;

   return arrToMap.map((val) => {
      const cols =
         val === "HomeAudio" || val === "HomeText" ? new MySwitch<Size, number>(size).case("tablet", 2).default(1) : 1;

      return (
         <ImageListItem
            key={val + size}
            cols={cols}
         >
            {COMPONENT_MAPPER[val]}
         </ImageListItem>
      );
   });
   return <div>HomeComponents</div>;
};

export default HomeComponents;

import React, { useEffect, useState } from "react";
import { ImageList } from "@mui/material";
import HomeComponents from "./HomeComponents";

import "../../styles/pages/home-page.scss";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const PC_MIN_WIDTH = 1300;
const TABLET_MIN_WIDTH = 800;

export type Size = "pc" | "mobile" | "tablet";

const Home: React.FC = () => {
   const [size, setSize] = useState<Size>(getSize);

   useEffect(() => {
      function handleResize() {
         setSize(getSize);
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   function getSize() {
      if (PC_MIN_WIDTH <= window.innerWidth) return "pc";
      if (TABLET_MIN_WIDTH <= window.innerWidth) return "tablet";
      return "mobile";
   }

   return (
      <PageWrapper className="page home_page">
         <ImageList
            className="home_grid"
            variant={size === "pc" ? "masonry" : "quilted"}
            cols={size === "mobile" ? 1 : 2}
            gap={24}
            component="div"
         >
            <HomeComponents size={size} />
         </ImageList>
      </PageWrapper>
   );
};

export default Home;

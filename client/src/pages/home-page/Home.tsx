import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Title from "../../components/Title";

import "../../styles/pages/home-page.scss";
import UpdatesBoard from "../../components/HomeComponents/UpdatesBoard";

const Home: React.FC = () => {
   return (
      <PageWrapper className="page home_page">
         <Title
            lordIcon={{
               src: "https://cdn.lordicon.com/hjbsbdhw.json",
               trigger: "hover",
               colors: "primary:#3a3347,secondary:#f24c00,tertiary:#b26836,quaternary:#ebe6ef",
            }}
         >
            האתר של סבתא שושי
         </Title>
         <UpdatesBoard />
      </PageWrapper>
   );
};

export default Home;

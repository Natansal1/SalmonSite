import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Title from "../../components/Title";
import UpdatesBoard from "../../components/HomeComponents/UpdatesBoard";

import "../../styles/pages/home-page.scss";

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
         <div className="home_bottom_section">
            <p className="home_text">
               האתר המשפחתי נבנה ע"י סבתא שושי ללמוד וללמד את תולדות המשפחה ולשתף את כל בני המשפחה בשמחות בחוויות
               ובארועים
            </p>
            <img
               className="home_page_gif"
               src="/images/home-page-gif.gif"
               alt="סרטון יוני"
               loading="lazy"
            />
            <UpdatesBoard />
         </div>
      </PageWrapper>
   );
};

export default Home;

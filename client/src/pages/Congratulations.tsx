import React from "react";
import { StoryType } from "../common/types/ServerTypes/Story.type";
import { MediaType } from "../common/types";
import "../styles/pages/congrats.style.scss";
import CongratsItem from "../components/CongratsItem";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Title from "../components/Title";

const DbInfo: StoryType[] = [
   {
      _id: "",
      title: "ברכה למיכאל ליום הולדת 23",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_dcfb58f570cb46a7b8417b11252b8b77~mv2.jpg/v1/fill/w_295,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_dcfb58f570cb46a7b8417b11252b8b77~mv2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content: "לכבוד יום ההולדת שלך הראשון בו מעמדך השתנה ומאדם העומד בפני עצמו אתה קשור לעזר כנגדו...",
      members: [],
      presentedDate: new Date(),
   },
   {
      _id: "",
      title: "ברכה לעירית ליום הולדת 22",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_6b27b01f2c1841fda821aed1781098b3~mv2.jpg/v1/fill/w_353,h_265,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_6b27b01f2c1841fda821aed1781098b3~mv2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content: "עירית היקרה שלנו... זה לא יאומן ואפילו מופלא איך מתגלה אופיה של ילדה כבר מגיל שנה... ",
      members: [],
   },
   {
      _id: "",
      title: "ברכה למיכאל ליום הולדת 23",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_dcfb58f570cb46a7b8417b11252b8b77~mv2.jpg/v1/fill/w_295,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_dcfb58f570cb46a7b8417b11252b8b77~mv2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content: "לכבוד יום ההולדת שלך הראשון בו מעמדך השתנה ומאדם העומד בפני עצמו אתה קשור לעזר כנגדו...",
      members: [],
      presentedDate: new Date(),
   },
   {
      _id: "",
      title: "ברכה לעירית ליום הולדת 22",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_6b27b01f2c1841fda821aed1781098b3~mv2.jpg/v1/fill/w_353,h_265,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_6b27b01f2c1841fda821aed1781098b3~mv2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content: "עירית היקרה שלנו... זה לא יאומן ואפילו מופלא איך מתגלה אופיה של ילדה כבר מגיל שנה... ",
      members: [],
   },
];

const Congratulations: React.FC = () => {
   return (
      <PageWrapper className="page congrats_page page_scroll">
         <Title>ברכות ואיחולים</Title>
         <div className="congrats_container">
            {DbInfo.map((e, index) => (
               <CongratsItem
                  key={index}
                  story={e}
               />
            ))}
         </div>
      </PageWrapper>
   );
};

export default Congratulations;

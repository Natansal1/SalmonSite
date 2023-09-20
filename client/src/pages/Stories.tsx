import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useWindowListener } from "../common/hooks";
import { StoryType } from "../common/types/ServerTypes/Story.type";
import { MediaType } from "../common/types";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Title from "../components/Title";
import Story from "../components/Story";
import "../styles/pages/story.style.scss";

const DbInfo: StoryType[] = [
   {
      _id: "",
      title: "רינת",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_1a9e0c434312485f813ce59c3b32b947~mv2_d_2000_3008_s_2.jpg/v1/fill/w_268,h_230,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_1a9e0c434312485f813ce59c3b32b947~mv2_d_2000_3008_s_2.jpg",
            type: MediaType.IMAGE,
         },
         {
            src: "https://static.wixstatic.com/media/72de53_29d79cb263804c0096d04f0b32b790df~mv2_d_3008_2000_s_2.jpg/v1/fill/w_268,h_230,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_29d79cb263804c0096d04f0b32b790df~mv2_d_3008_2000_s_2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content:
         "רינת ילדה חברותית מאוד מתייחסת לכל הסביבה ומחייכת לכולם. שי מתעקש לא לשמור עליה כדי שתגדל ילדה פתוחה וללא מעצורים- לנו כמובן הוא מוציא את הנשמה מדאגה. אסור לשמור עליה במדרגות, אסור לעצור אותה מלהכניס משהוא לפה. ההתערבות מותרת רק כאשר הסכנה גלויה. - ישמרה אלוקים.",
      members: [],
      presentedDate: new Date(),
   },
   {
      _id: "",
      title: "אילה - שהפכה אותי לסבתא",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_42f586e9deff438aacdf652e92f92ee9~mv2.jpg/v1/fill/w_268,h_245,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_42f586e9deff438aacdf652e92f92ee9~mv2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content:
         ' אילה בת שלוש כאשר הגשם הראשון התחיל לרדת , אילה הלכה עם מיכאל והוא הסביר לה שיורד גשם מהעננים, ביום אחר שהיו עננים אבל לא היה גשם אילה אומרת למיכאל "לעננים האלה אין חור"',
      members: [],
   },
   {
      _id: "",
      title: "נתן הגבגבר",
      media: [],
      content:
         'הסברתי לאילה שהיא "שלמון" ושני "שלמון" ורינת "שלמון" ושי ולימור, ועירית... אמרתי שעירית היתה שלמון אבל היא  התחתנה ועכשיו היא "הלוי" אז אילה חושבת רגע ואומרת:"סבתא , אז את עדין לא התחתנת נתן. חמוד חמוד בינתיים לא עושה כלום... למרות שמיכאל ומלי אומרים שהוא מתהפך אני עדין לא ראיתי את ביצועי',
      members: [],
   },
   {
      _id: "",
      title: "נתן",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_f67979fa87314e5f9f3c54771084bfcf~mv2_d_1977_2763_s_2.jpg/v1/crop/x_0,y_0,w_1977,h_2358/fill/w_188,h_225,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_f67979fa87314e5f9f3c54771084bfcf~mv2_d_1977_2763_s_2.jpg",
            type: MediaType.IMAGE,
         },
         {
            src: "https://static.wixstatic.com/media/72de53_0d56cdf291c84280b5e075fc09d5597b~mv2_d_2112_3168_s_2.jpg/v1/crop/x_0,y_58,w_2112,h_2269/fill/w_208,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_0d56cdf291c84280b5e075fc09d5597b~mv2_d_2112_3168_s_2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content:
         'שני ונתן התארחו אצלנו בשבת, ישראל ואני שיחקנו בטניס שולחן ואמרנו ששני תעודד את הבנות ונתן יעודד את הבנים וכך היה. ואז נתן אומר לישראל : "סבא, תעודד את עצמך , אני הולך לעשות פיפי...."',
      members: [],
   },
   {
      _id: "",
      title: "מי ישמע ישמור ויציל?",
      media: [
         {
            src: "https://static.wixstatic.com/media/72de53_8693cb69c01042d483df5cd8ef09aacc~mv2_d_2816_2112_s_2.jpg/v1/fill/w_201,h_173,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/72de53_8693cb69c01042d483df5cd8ef09aacc~mv2_d_2816_2112_s_2.jpg",
            type: MediaType.IMAGE,
         },
      ],
      content:
         "יוני לוקח את נתן לשרותים.\nנתן: כל מה שאני אוכל נהיה קקי.\nיוני: לא חלק מזה נהיה אתה.\nנתן: אני הבנתי.\nיוני:מה הבנת? \nנתן: אתה חצוף!!",
      members: [],
   },
];

function calculateChildXS(count: number, minWidth: number, gap: number, containerWidth: number) {
   minWidth = Math.min(minWidth, containerWidth);
   let currentWidth = containerWidth,
      rows = 1,
      inRow = 0;

   for (let i = 0; i < count; i++) {
      currentWidth -= minWidth;
      if (inRow > 0) currentWidth -= gap;
      if (currentWidth < 0) {
         rows++;
         inRow = 1;
         currentWidth = containerWidth - minWidth;
      }
   }

   const inAll = Math.floor(count / rows);
   let remaining = count % rows;
   const xsArr: number[] = [];

   for (let i = 0; i < rows; i++) {
      const itemsInRow = inAll + (remaining > 0 ? 1 : 0);

      for (let j = 0; j < itemsInRow; j++) {
         xsArr.push(Math.round(12 / itemsInRow));
      }

      remaining--;
   }

   return xsArr;
}

const Stories: React.FC = () => {
   const [childrenXs, setChildrenXs] = useState<number[]>(getXs);

   useWindowListener("resize", () => setChildrenXs(getXs));

   function getXs() {
      return calculateChildXS(DbInfo.length, 450, 40, window.innerWidth - window.innerWidth / 50);
   }

   return (
      <PageWrapper className="page page_scroll stories_page">
         <Title
            lordIcon={{
               src: "https://cdn.lordicon.com/dxoycpzg.json",
               trigger: "morph",
               colors: "primary:#30c9e8,secondary:#9ce5f4,tertiary:#4bb3fd,quaternary:#d1e3fa,quinary:#a39cf4",
            }}
         >
            סבתא שושי מספרת
         </Title>
         <Grid
            className="stories_container"
            spacing={5}
            container
         >
            {DbInfo.map((story, index) => (
               <Story
                  xs={childrenXs[index]}
                  key={"story_" + index}
                  story={story}
               />
            ))}
         </Grid>
      </PageWrapper>
   );
};

export default Stories;

import React from "react";
import { useNavigate } from "react-router-dom";
import CardsLineup from "../../components/CardsLineup";
import { useQuery } from "@tanstack/react-query";

import "../../styles/pages/pictures-page.scss";
import axios from "axios";
import { FamilyPictureCategory } from "../../common/types";
import Loading from "../Loading";
import { queryKeys } from "../../common/enums";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Title from "../../components/Title";

const Pictures: React.FC = () => {
   const navigate = useNavigate();
   const { data: images, status } = useQuery({
      queryFn: async () => (await axios.get<FamilyPictureCategory[]>("/api/family-picture/categories")).data,
      queryKey: [queryKeys.PICTURES],
      select: (data) =>
         data.map((val) => ({
            id: val._id,
            src: val.mainImage,
            text: val.title,
            subtext: val.description,
            alt: val.title,
         })),
   });

   if (status !== "success") return <Loading />;

   return (
      <PageWrapper className="pictures_page page page_scroll">
         <Title
            lordIcon={{
               src: "https://cdn.lordicon.com/qierxeeb.json",
               trigger: "hover",
               colors: "primary:#7166ee,secondary:#d1faf0,tertiary:#ebe6ef,quaternary:#110a5c,quinary:#4f1091",
            }}
         >
            תמונות משפחתיות
         </Title>
         <div className="picture_page_content">
            <CardsLineup
               onClick={(id) => navigate(id.toString())}
               className="family_pictures_categories"
               images={images}
            />
         </div>
      </PageWrapper>
   );
};

export default Pictures;

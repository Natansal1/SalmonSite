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
         <h1 className="title">תמונות משפחתיות</h1>
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

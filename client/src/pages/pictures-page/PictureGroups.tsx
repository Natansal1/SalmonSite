import React from "react";
import PictureGroup from "../../components/PictureGroup/PictureGroup";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/enums";
import axios from "axios";
import { FamilyPicture } from "../../common/types";
import Loading from "../Loading";
import ReturnButton from "../../components/ReturnButton";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const PictureGroups: React.FC = () => {
   const { groupId } = useParams<"groupId">();
   const { data, status } = useQuery({
      queryKey: [queryKeys.PICTURE_GROUPS, groupId],
      queryFn: async () => (await axios.get<FamilyPicture>(`/api/family-picture/${groupId}`)).data,
      select: (data) => ({
         groups: data.mediaGroups.map((val) => ({
            ...val,
            presentedDate: val.presentedDate ? new Date(val.presentedDate) : undefined,
         })),
         mainImage: data.mainImage,
      }),
   });

   if (status !== "success") return <Loading />;

   const { groups, mainImage } = data;

   return (
      <PageWrapper className="page page_scroll">
         <h1 className="title scroll">כותרת יפה</h1>
         <ReturnButton />
         <div className="picture_groups_container">
            {groups.map((group, index) => (
               <PictureGroup
                  {...group}
                  key={group.title + index}
               />
            ))}
         </div>
      </PageWrapper>
   );
};

export default PictureGroups;

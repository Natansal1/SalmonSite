import { Media } from "..";

export type FamilyPicture = {
   description?: string;
   mediaGroups: {
      media: Media[];
      title: string;
      description?: string;
      presentedDate?: string;
   }[];
} & FamilyPictureCategory;

export type FamilyPictureCategory = {
   _id: string;
   mainImage: string;
   title: string;
   description?: string;
};

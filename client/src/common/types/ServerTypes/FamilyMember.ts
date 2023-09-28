import { Media } from "./Media";

export type FamilyMember = {
   _id: string;
   firstName: string;
   lastName: string;
   DOB: Date;
   DOD?: Date;
   media?: Omit<Media, "people">;
   gender: "male" | "female";
   parents?: {
      mother?: FamilyMember["_id"];
      father?: FamilyMember["_id"];
   };
   partner?: FamilyMember["_id"];
   hasInfoPage?: boolean;
};

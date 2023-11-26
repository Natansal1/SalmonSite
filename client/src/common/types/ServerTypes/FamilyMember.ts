import { Media } from "./Media";

export type FamilyMember = {
   _id: string;
   firstName: string;
   lastName: string;
   DOB: Date | string;
   DOD?: Date | string;
   media?: Omit<Media, "people">;
   gender: "male" | "female";
   parents?: {
      mother?: FamilyMember["_id"];
      father?: FamilyMember["_id"];
   };
   partner?: FamilyMember["_id"];
   hasPage?: boolean; //Does not exist in the DB, created from aggregation
};

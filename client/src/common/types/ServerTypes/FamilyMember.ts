import { Media } from "./Media";

export type FamilyMember = {
   _id: string;
   firstName: string;
   lastName: string;
   DOB: Date;
   DOD?: Date;
   media?: Omit<Media, "people">;
};

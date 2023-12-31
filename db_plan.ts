type FamilyMember = {
   _id: UUID;
   firstName: string;
   lastName: string;
   DOB: Date;
   DOD?: Date;
   media?: Media;
};

type Story = {
   _id: UUID;
   title: string;
   media: Media[];
   content: string;
   members: FamilyMember["_id"][];
   presentedDate?: Date | string;
};

type Congrats = Story;

type Occasion = {
   _id: UUID;
   title: string;
   mainImg: string;
   media: Media[];
   description?: string;
   sections: Section[];
   presentedDate?: Date | string;
};

type Picture = {
   mainImg: string;
   title: string;
   description?: string;
   mediaGroups: {
      media: Media[];
      title: string;
      presentedDate?: Date | string;
   }[];
};

type Origin = {
   OriginName: string; //defaults to family member name
   familyMember?: FamilyMember["_id"];
   pages: Page[];
};

/* HELPERS - (Not in DB) */

type Page = {
   pageName: string;
   sections: Section[];
};

type Section = {
   title: string;
   content: string;
   media: Media[];
   link?: {
      href: string;
      text: string;
   };
};

type UUID = string;

type Media = {
   type: MediaType;
   src: string;
   people?: FamilyMember["_id"][];
};

type MediaType = "audio" | "video" | "image";

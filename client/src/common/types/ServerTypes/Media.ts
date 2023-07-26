export type Media = {
   src: string;
   type: MediaType;
   people?: string[]; //array of ids
};

export type MediaType = "image" | "video" | "audio";

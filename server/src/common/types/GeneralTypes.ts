export type Media = {
   type: MediaType;
   src: string;
   people?: string[];
};

export type MediaType = "audio" | "video" | "image";

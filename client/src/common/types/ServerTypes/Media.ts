export type Media = {
   src: string;
   type: MediaType;
   people?: string[]; //array of ids
};

export enum MediaType {
   IMAGE = "image",
   VIDEO = "video",
   AUDIO = "audio",
}

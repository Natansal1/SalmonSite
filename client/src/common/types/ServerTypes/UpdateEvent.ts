export type UpdateEvent = {
   start: Date;
   end?: Date; //defaults to one day
   title: string;
   url?: string;
};

import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UpdateEventDocument = HydratedDocument<UpdateEvent>;

const { ObjectId } = mongoose.Schema.Types;

@Schema({ collection: "UpdateEvents" })
export class UpdateEvent {
   @Prop({ type: ObjectId, auto: true })
   _id: string;

   @Prop({ type: Date, isRequired: true })
   start: Date;

   @Prop({ type: Date, isRequired: false })
   end?: Date;

   @Prop({ type: String, isRequired: true })
   title: string;

   @Prop({ type: String, isRequired: false })
   url?: string;
}

export const UpdateEventSchema = SchemaFactory.createForClass(UpdateEvent);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

@Schema({ _id: false })
export class Media {
   @Prop({ type: String, isRequired: true })
   type: string;

   @Prop({ type: String, isRequired: true })
   src: string;

   @Prop({ type: [{ type: ObjectId, ref: "FamilyMembers" }], isRequired: false })
   people: [string];
}

export const MediaSchema = SchemaFactory.createForClass(Media);

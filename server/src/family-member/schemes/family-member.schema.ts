import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Media } from "src/common/types";

export type FamilyMemberDocument = HydratedDocument<FamilyMember>;

const { ObjectId, String, Date } = mongoose.Schema.Types;

@Schema()
export class FamilyMember {
   @Prop({ type: ObjectId, auto: true })
   _id: string;

   @Prop({ type: String, isRequired: true })
   firstName: string;

   @Prop({ type: String, isRequired: true })
   lastName: string;

   @Prop({ type: Date, isRequired: true })
   DOB: Date;

   @Prop({ type: Date, isRequired: false })
   DOD?: Date;

   @Prop({ type: { type: String, src: String }, isRequired: false })
   media?: Media;
}

export const FamilyMemberSchema = SchemaFactory.createForClass(FamilyMember);

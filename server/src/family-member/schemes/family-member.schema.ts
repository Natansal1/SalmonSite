import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Media } from "src/common/types";

export type FamilyMemberDocument = HydratedDocument<FamilyMember>;

const { ObjectId } = mongoose.Schema.Types;

@Schema({ collection: "FamilyMembers" })
export class FamilyMember {
   @Prop({ type: ObjectId, auto: true })
   _id: string;

   @Prop({ type: String, isRequired: true })
   firstName: string;

   @Prop({ type: String, isRequired: true })
   lastName: string;

   @Prop({ type: Date, isRequired: true })
   DOB: Date;

   @Prop({ type: Date })
   DOD?: Date;

   @Prop({ type: { type: String, src: String } })
   media?: Media;

   @Prop({ type: String, isRequired: true })
   gender: "male" | "female";

   @Prop({ type: ObjectId, ref: "FamilyMembers" })
   partner?: string;

   @Prop({
      type: {
         mother: { type: ObjectId, ref: "FamilyMembers" },
         father: { type: ObjectId, ref: "FamilyMembers" },
      },
      _id: false,
   })
   parents: {
      mother?: string;
      father?: string;
   };
}

export const FamilyMemberSchema = SchemaFactory.createForClass(FamilyMember);

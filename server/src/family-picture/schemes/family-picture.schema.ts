import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Media } from "src/common/types";
import { MediaSchema } from "src/common/schemas";
const { ObjectId } = mongoose.Schema.Types;

export type FamilyMemberDocument = HydratedDocument<FamilyPicture>;

@Schema({ collection: "FamilyPictures" })
export class FamilyPicture {
   @Prop({ type: ObjectId, auto: true })
   _id: string;

   @Prop({ type: String, isRequired: true })
   mainImage: string;

   @Prop({ type: String, isRequired: true })
   title: string;

   @Prop({ type: String, isRequired: false })
   description?: string;

   @Prop({
      type: [
         {
            media: [MediaSchema],
            title: String,
            description: String,
            presentedDate: Date,
         },
      ],
      isRequired: true,
   })
   mediaGroups: { media: Media[]; title: string; description?: string; presentedDate?: Date }[];
}

export const FamilyPictureSchema = SchemaFactory.createForClass(FamilyPicture);

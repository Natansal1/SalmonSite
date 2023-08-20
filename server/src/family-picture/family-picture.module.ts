import { Module } from "@nestjs/common";
import { FamilyPictureController } from "./family-picture.controller";
import { FamilyPictureService } from "./family-picture.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilyPicture, FamilyPictureSchema } from "./schemes/family-picture.schema";

@Module({
   imports: [MongooseModule.forFeature([{ name: FamilyPicture.name, schema: FamilyPictureSchema }])],
   controllers: [FamilyPictureController],
   providers: [FamilyPictureService],
})
export class FamilyPictureModule {}

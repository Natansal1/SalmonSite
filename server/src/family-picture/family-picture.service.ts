import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FamilyPicture } from "./schemes/family-picture.schema";
import mongoose, { Model } from "mongoose";
import { CreateFamilyPictureDto } from "./dto/family-picture.dto";

@Injectable()
export class FamilyPictureService {
   constructor(@InjectModel(FamilyPicture.name) private familyPictureModel: Model<FamilyPicture>) {}

   async getAll() {
      return await this.familyPictureModel.find();
   }

   async getAllCategories() {
      return await this.familyPictureModel.find().select(["_id", "mainImage", "title"]).exec();
   }

   async getOne(id: string) {
      const document = await this.familyPictureModel.findById(new mongoose.Types.ObjectId(id));
      if (!document) throw new NotFoundException("No family picture group found with the given id");
      return document;
   }

   async addOne(member: CreateFamilyPictureDto) {
      const newPictureDocument = await this.familyPictureModel.create(member);
      const { _id } = await newPictureDocument.save();
      return _id;
   }
}

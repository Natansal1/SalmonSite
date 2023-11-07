import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FamilyMember } from "./schemes/family-member.schema";
import mongoose, { Model, Mongoose } from "mongoose";
import { CreateFamilyMemberDto } from "./dto/family-member.dto";

@Injectable()
export class FamilyMemberService {
   constructor(@InjectModel(FamilyMember.name) private familyMemberModel: Model<FamilyMember>) {}

   async getAll() {
      return await this.familyMemberModel.aggregate([
         {
            $lookup: {
               from: "origin",
               as: "origin",
               localField: "_id",
               foreignField: "familyMember",
            },
         },
         {
            $addFields: {
               hasPage: {
                  $gt: [{ $size: "$origin" }, 0],
               },
            },
         },
         {
            $project: {
               origin: false,
            },
         },
      ]);
   }

   async getOne(id: string) {
      const document = await this.familyMemberModel.aggregate([
         {
            $match: {
               _id: new mongoose.Types.ObjectId(id),
            },
         },
         {
            $lookup: {
               from: "origin",
               as: "origin",
               localField: "_id",
               foreignField: "familyMember",
            },
         },
         {
            $addFields: {
               hasPage: {
                  $gt: [{ $size: "$origin" }, 0],
               },
            },
         },
         {
            $project: {
               origin: false,
            },
         },
      ]);
      if (!document || !document.length) throw new NotFoundException("No family member found with the given id");
      return document[0];
   }

   async addOne(member: CreateFamilyMemberDto) {
      const newMemberDocument = await this.familyMemberModel.create(member);
      const { _id } = await newMemberDocument.save();
      return _id;
   }
}

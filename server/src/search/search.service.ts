import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, PipelineStage } from "mongoose";
import { FamilyPicture, FamilyPictureSchema } from "src/family-picture/schemes/family-picture.schema";

@Injectable()
export class SearchService {
   constructor(@InjectConnection() private connection: Connection) {}

   async temp() {
      return await this.connection.model("FamilyPictures", FamilyPictureSchema).find();
   }

   async searchFamilyPictures(query: string) {
      if (!query || typeof query !== "string") throw new BadRequestException("Bad request");
      const pictureModel = this.connection.model(FamilyPicture.name, FamilyPictureSchema);

      const regexQuery = {
         $regex: query,
         $options: "i", // Case-insensitive search
      };

      const lookupStage: PipelineStage.Lookup = {
         $lookup: {
            from: "FamilyMembers",
            localField: "mediaGroups.media.people",
            foreignField: "_id",
            as: "peopleInfo",
         },
      };

      const unwindStage = {
         $unwind: "$mediaGroups",
      };

      const projectStage = {
         $project: {
            _id: true,
            mainImage: true,
            title: true,
            description: true,
            "mediaGroups.media": true,
            "mediaGroups.title": true,
            "mediaGroups.description": true,
            "mediaGroups.presentedDate": true,
            "mediaGroups.firstName": "$mediaGroups.media.peopleInfo.firstName",
            "mediaGroups.lastName": "$mediaGroups.media.peopleInfo.lastName",
         },
      };

      const searchCriteria = {
         $or: [
            { title: regexQuery },
            { "mediaGroups.title": regexQuery },
            { "mediaGroups.firstName": regexQuery },
            { "mediaGroups.lastName": regexQuery },
         ],
      };

      const aggregationPipeline = [lookupStage, unwindStage, projectStage, { $match: searchCriteria }];
      const searchResults = await pictureModel.aggregate(aggregationPipeline);

      return searchResults;
   }
}

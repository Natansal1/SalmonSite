import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FamilyMember } from "./schemes/family-member.schema";
import { Model } from "mongoose";

@Injectable()
export class FamilyMemberService {
   constructor(@InjectModel(FamilyMember.name) private familyMemberModel: Model<FamilyMember>) {}
}

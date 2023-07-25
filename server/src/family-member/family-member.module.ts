import { Module } from "@nestjs/common";
import { FamilyMemberController } from "./family-member.controller";
import { FamilyMemberService } from "./family-member.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilyMember, FamilyMemberSchema } from "./schemes/family-member.schema";

@Module({
   imports: [MongooseModule.forFeature([{ name: FamilyMember.name, schema: FamilyMemberSchema }])],
   controllers: [FamilyMemberController],
   providers: [FamilyMemberService],
})
export class FamilyMemberModule {}

// @Schema({ collection: "FamilyMembers" })
// export class FamilyMember {
//    @Prop({ type: ObjectId, auto: true })
//    _id: string;

import { Type } from "class-transformer";
import { IsDateString, IsObject, IsOptional, IsString } from "class-validator";
import { MediaDto } from "src/common/dto";

export class CreateFamilyMemberDto {
   @IsString()
   firstName: string;

   @IsString()
   lastName: string;

   @IsDateString()
   DOB: Date;

   @IsDateString()
   @IsOptional()
   DOD?: Date;

   @IsOptional()
   @IsObject()
   @Type(() => MediaDto)
   media?: MediaDto;
}

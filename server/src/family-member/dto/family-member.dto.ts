import { Type } from "class-transformer";
import {
   IsArray,
   IsBoolean,
   IsDateString,
   IsEnum,
   IsMongoId,
   IsObject,
   IsOptional,
   IsString,
   ValidateNested,
} from "class-validator";
import { MediaDto } from "src/common/dto";

class ParentsDTO {
   @IsOptional()
   @IsMongoId()
   mother?: string;

   @IsOptional()
   @IsMongoId()
   father?: string;
}

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

   @IsEnum(["male", "female"])
   gender: "male" | "female";

   @IsOptional()
   @IsMongoId()
   partner?: string;

   @IsOptional()
   @ValidateNested()
   @Type(() => ParentsDTO)
   parents: ParentsDTO;
}

export class CreateManyFamilyMemberDto {
   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => CreateFamilyMemberDto)
   members: CreateFamilyMemberDto[];
}

export class PatchFamilyMemberDTO {
   @IsBoolean()
   @IsOptional()
   replace?: boolean;

   @IsObject()
   @Type(() => CreateFamilyMemberDto)
   member: Partial<CreateFamilyMemberDto>;
}

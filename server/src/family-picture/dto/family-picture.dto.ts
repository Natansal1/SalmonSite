import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MediaDto } from "src/common/dto";
import { Media } from "src/common/types";

export class CreateFamilyPictureDto {
   @IsString()
   @IsNotEmpty()
   mainImage: string;

   @IsString()
   @IsNotEmpty()
   title: string;

   @IsString()
   @IsOptional()
   description?: String;

   @IsArray()
   @Type(() => MediaGroupDto)
   mediaGroups: MediaGroupDto[];
}

export class MediaGroupDto {
   @IsArray({ each: true })
   @Type(() => MediaDto)
   media: Media[];
   @IsString()
   title: string;

   @IsString()
   @IsOptional()
   description?: string;

   @IsDateString()
   @IsOptional()
   presentedDate: Date;
}

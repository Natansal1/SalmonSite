import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MediaTypeEnum } from "../enums";

export class MediaDto {
   @IsEnum(MediaTypeEnum)
   type: MediaTypeEnum;

   @IsString()
   @IsNotEmpty()
   src: string;

   @IsOptional()
   @IsArray({ each: true })
   @IsString()
   people: string[];
}

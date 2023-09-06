import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateUpdateEventDto {
   @IsDateString()
   start: string;

   @IsOptional()
   @IsDateString()
   end?: string;

   @IsString()
   title: string;

   @IsString()
   @IsOptional()
   url?: string;
}

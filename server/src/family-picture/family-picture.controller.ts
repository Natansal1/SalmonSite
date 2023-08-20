import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FamilyPictureService } from "./family-picture.service";
import { CreateFamilyPictureDto } from "./dto/family-picture.dto";

@Controller("family-picture")
export class FamilyPictureController {
   constructor(private readonly familyPictureService: FamilyPictureService) {}

   @Get()
   getAll() {
      return this.familyPictureService.getAll();
   }

   @Get("categories")
   getCategories() {
      return this.familyPictureService.getAllCategories();
   }

   @Get(":id")
   getOne(@Param("id") id: string) {
      return this.familyPictureService.getOne(id);
   }

   @Post()
   async addOne(@Body() createMember: CreateFamilyPictureDto) {
      const id = await this.familyPictureService.addOne(createMember);
      return { id };
   }
}

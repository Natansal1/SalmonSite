import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FamilyMemberService } from "./family-member.service";
import { CreateFamilyMemberDto } from "./dto/family-member.dto";

@Controller("family-member")
export class FamilyMemberController {
   constructor(private readonly familyMemberService: FamilyMemberService) {}
   @Get()
   getAll() {
      return this.familyMemberService.getAll();
   }

   @Get(":id")
   getOne(@Param("id") id: string) {
      return this.familyMemberService.getOne(id);
   }

   @Post()
   async addOne(@Body() createMember: CreateFamilyMemberDto) {
      const id = await this.familyMemberService.addOne(createMember);
      return { id };
   }
}

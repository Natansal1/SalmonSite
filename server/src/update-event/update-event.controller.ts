import { BadRequestException, Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UpdateEventService } from "./update-event.service";
import { isValidDate } from "src/common/functions";
import { CreateUpdateEventDto } from "./dto/update-event.dto";

@Controller("update-event")
export class UpdateEventController {
   constructor(private readonly updateEventService: UpdateEventService) {}
   @Get()
   getAll(@Query("start") start?: string, @Query("end") end?: string) {
      if (!start && !end) return this.updateEventService.getAll();
      const startDate = new Date(start),
         endDate = new Date(end);

      if (!isValidDate(startDate) || !isValidDate(endDate))
         throw new BadRequestException({ startDate, endDate, message: "bad input" });

      return this.updateEventService.getByDates(startDate, endDate);
   }

   @Get(":id")
   getOne(@Param("id") id: string) {
      return this.updateEventService.getOne(id);
   }

   @Post()
   addOne(@Body() createDto: CreateUpdateEventDto) {
      return this.updateEventService.addOne(createDto);
   }
}

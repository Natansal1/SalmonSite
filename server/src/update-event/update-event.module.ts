import { Module } from "@nestjs/common";
import { UpdateEventService } from "./update-event.service";
import { UpdateEventController } from "./update-event.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UpdateEvent } from "./schemes/update-event.schema";

@Module({
   imports: [MongooseModule.forFeature([{ name: UpdateEvent.name, schema: UpdateEventController }])],
   providers: [UpdateEventService],
   controllers: [UpdateEventController],
})
export class UpdateEventModule {}

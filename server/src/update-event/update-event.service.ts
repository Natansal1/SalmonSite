import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateEvent } from "./schemes/update-event.schema";
import { Model } from "mongoose";
import { CreateUpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class UpdateEventService {
   constructor(@InjectModel(UpdateEvent.name) private updateEventModel: Model<UpdateEvent>) {}

   getAll() {
      return this.updateEventModel.find();
   }

   async getOne(id: string) {
      const one = this.updateEventModel.findById(id);
      if (one) return one;
      else throw new NotFoundException("No update found");
   }

   getByDates(start: Date, end: Date) {
      return this.updateEventModel.aggregate([
         {
            $match: {
               $or: [
                  {
                     start: {
                        $and: [
                           {
                              $gte: start,
                           },
                           {
                              $lte: end,
                           },
                        ],
                     },
                  },
                  {
                     end: {
                        $and: [
                           {
                              $gte: start,
                           },
                           {
                              $lte: end,
                           },
                        ],
                     },
                  },
               ],
            },
         },
      ]);
   }

   addOne(createDto: CreateUpdateEventDto) {
      const createdInstance = new this.updateEventModel(createDto);
      return createdInstance.save();
   }
}

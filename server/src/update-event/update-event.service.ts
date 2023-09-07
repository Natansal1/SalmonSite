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
                     $and: [
                        {
                           start: {
                              $gte: start,
                           },
                        },
                        {
                           start: {
                              $lte: end,
                           },
                        },
                     ],
                  },
                  {
                     $and: [
                        {
                           end: {
                              $gte: start,
                           },
                        },
                        {
                           end: {
                              $lte: end,
                           },
                        },
                     ],
                  },
                  {
                     $and: [
                        {
                           start: {
                              $lte: start,
                           },
                        },
                        {
                           end: {
                              $gte: end,
                           },
                        },
                     ],
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

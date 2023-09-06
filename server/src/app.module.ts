import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilyMemberModule } from "./family-member/family-member.module";
import { FamilyPictureModule } from "./family-picture/family-picture.module";
import { SearchModule } from "./search/search.module";
import { UpdateEventModule } from './update-event/update-event.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: `.env.${process.env.NODE_ENV}`,
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DB_URI, {
         appName: "SalmonSite",
      }),
      FamilyMemberModule,
      FamilyPictureModule,
      SearchModule,
      UpdateEventModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}

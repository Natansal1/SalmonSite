import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FamilyMemberModule } from "./family-member/family-member.module";

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
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}

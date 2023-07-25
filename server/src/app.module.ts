import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI, {
      appName: 'SalmonSite',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

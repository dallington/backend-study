import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import database from './config/database';
@Module({
  imports: [MongooseModule.forRoot(database.connectionString), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

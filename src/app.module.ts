import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

import { ConfigModule } from '@nestjs/config';

import database from './config/database';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRoot(database.connectionString),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

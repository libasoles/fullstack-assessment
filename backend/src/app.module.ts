import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [typeorm],
});

const typeOrmModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get('typeorm'),
});

@Module({
  imports: [configModule, typeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

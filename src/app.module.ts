import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? join(__dirname, '../.env.production')
          : process.env.NODE_ENV === 'staging'
          ? join(__dirname, '../.env.staging')
          : join(__dirname, '../.env'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

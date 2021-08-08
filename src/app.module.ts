import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [configuration],
      envFilePath: join(__dirname, '../.env'),
    }),
    DatabaseModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

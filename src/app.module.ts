import { LicenseModule } from './modules/license/license.module';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
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
    AuthModule,
    LicenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

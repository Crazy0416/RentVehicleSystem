import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AccountV0Controller } from './api/account.v0.controller';
import { AccountService } from './domain/account.service';
import { SignService } from './application/sign.service';
import { DbAccountRepository } from './infrastructure/db-account.repository';

@Module({
  imports: [
    UserModule,
    // FIXME: 인증 모듈을 따로 구현할 것.
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('auth');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AccountV0Controller],
  providers: [AccountService, SignService, DbAccountRepository],
  exports: [AccountService],
})
export class AccountModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AccountV0Controller } from './api/account.v0.controller';
import { AccountService } from './domain/account.service';
import { SignAppService } from './application/sign.app-service';
import { DbAccountRepository } from './infrastructure/db-account.repository';

@Module({
  imports: [
    // FIXME: 인증 모듈을 따로 구현할 것.
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('auth');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([DbAccountRepository]),
  ],
  controllers: [AccountV0Controller],
  providers: [AccountService, SignAppService],
  exports: [AccountService, TypeOrmModule],
})
export class AccountModule {}

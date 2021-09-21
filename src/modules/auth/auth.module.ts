import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AccountModule } from './../account/account.module';

@Global()
@Module({
  imports: [AccountModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

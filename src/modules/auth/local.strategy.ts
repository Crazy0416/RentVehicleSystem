import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from './../account/domain/account.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Account> {
    const account = await this.authService.validateUser(email, password);
    if (!account) {
      throw new UnauthorizedException('인증 에러');
    }

    return account;
  }
}

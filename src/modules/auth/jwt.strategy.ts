import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from './../account/domain/account.repository';
import { DbAccountRepository } from './../account/infrastructure/db-account.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(DbAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth').secret,
    });
  }

  async validate(payload: any) {
    const userId = payload.id;
    const user = await this.accountRepository.findOne({
      where: { id: userId },
    });

    return user;
  }
}

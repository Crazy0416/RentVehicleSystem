import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Account } from '../account/domain/account.entity';
import { AccountRepository } from './../account/domain/account.repository';
import { DbAccountRepository } from './../account/infrastructure/db-account.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DbAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  public async validateUser(email: string, password: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { email } });
    if (!account || !(await account.comparePassword(password))) {
      throw new UnauthorizedException('아이디 혹은 비밀번호가 틀립니다.');
    }

    return account;
  }
}

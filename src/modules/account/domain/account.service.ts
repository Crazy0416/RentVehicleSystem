import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Account } from './account.domain';
import { AccountRepository } from './account.repository';
import { DbAccountRepository } from './../infrastructure/db-account.repository';

@Injectable()
export class AccountService {
  constructor(
    @Inject(DbAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  /**
   * @param {Account} account
   * @memberof AccountService
   * @description account 계정을 가입시킨다.
   */
  public async signUpAccount(account: Account): Promise<Account> {
    if (await this.accountRepository.checkExist(account)) {
      throw new ConflictException(
        '이미 가입된 계정입니다.',
        `${account.getEmail()} 계정은 이미 가입된 계정입니다.`,
      );
    }

    // 계정을 persistence 계층에 저장.
    return await this.accountRepository.save(account);
  }
}

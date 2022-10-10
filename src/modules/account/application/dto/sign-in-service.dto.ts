import { Account } from '../../domain/account.entity';

export class SignInServiceDto {
  public account: Account;

  constructor(account: Account) {
    this.account = account;
  }
}

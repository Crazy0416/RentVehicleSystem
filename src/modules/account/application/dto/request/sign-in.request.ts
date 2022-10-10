import { Account } from '../../../domain/account.entity';

export class SignInRequest {
  public account: Account;

  constructor(account: Account) {
    this.account = account;
  }
}

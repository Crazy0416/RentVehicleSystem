import { Account } from './../../domain/account.entity';

export class SignUpServiceDto {
  public email: string;

  public password: string;

  public name: string;

  public async toAccountDomain(): Promise<Account> {
    const account = await (
      await new Account.Builder()
        .setEmail(this.email)
        .setName(this.name)
        .setPassword(this.password)
    ).build();

    return account;
  }
}

import { Account } from './account.domain';

export interface AccountRepository {
  checkExist(account: Account): Promise<boolean>;
  save(account: Account): Promise<Account>;
}

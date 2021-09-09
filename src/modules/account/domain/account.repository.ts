import { FindOneOptions } from 'typeorm';
import { Account } from './account.entity';

export interface AccountRepository {
  checkExist(account: Account): Promise<boolean>;
  findOne(options?: FindOneOptions<Account>): Promise<Account>;
  save(account: Account): Promise<Account>;
}

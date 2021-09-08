import { Repository, EntityRepository } from 'typeorm';
import { Account } from './../domain/account.domain';
import { AccountRepository } from './../domain/account.repository';

@EntityRepository(Account)
export class DbAccountRepository extends Repository<Account>
  implements AccountRepository {
  /**
   * @param {Account} account
   * @returns {Promise<boolean>}
   * @memberof DbAccountRepository
   * @description account 도메인이 Persistence 계층에 존재하는지 확인
   */
  public async checkExist(account: Account): Promise<boolean> {
    const user = await this.findOne({
      where: { email: account.getEmail() },
    });
    if (user) {
      return true;
    }
    return false;
  }
}

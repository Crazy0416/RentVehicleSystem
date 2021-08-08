import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './../domain/account.domain';
import { User } from '../../../modules/user/domain/user.entity';
import { AccountRepository } from './../domain/account.repository';

@Injectable()
export class DbAccountRepository implements AccountRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @param {Account} account
   * @returns {Promise<boolean>}
   * @memberof DbAccountRepository
   * @description account 도메인이 Persistence 계층에 존재하는지 확인
   */
  public async checkExist(account: Account): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: account.getEmail() },
    });
    console.log(user);
    if (user) {
      return true;
    }
    return false;
  }

  public async save(account: Account): Promise<Account> {
    const savedUser = await this.userRepository.save(account.getUser());

    return new Account(savedUser);
  }
}

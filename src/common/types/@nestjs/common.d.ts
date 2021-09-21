import { Account } from './../../../modules/account/domain/account.entity';

declare module '@nestjs/common' {
  interface Request {
    user: Account;
  }
}

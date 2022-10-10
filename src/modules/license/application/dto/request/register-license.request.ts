import { Account } from '../../../../account/domain/account.entity';

export class RegisterLicenseRequest {
  public number: string;

  public name: string;

  public user: Account;

  public birth: Date;

  public serialNumber: string;

  public expiredAt: Date;

  constructor(
    number: string,
    name: string,
    user: Account,
    birth: Date,
    serialNumber: string,
    expiredAt: Date,
  ) {
    this.number = number;
    this.name = name;
    this.user = user;
    this.birth = birth;
    this.serialNumber = serialNumber;
    this.expiredAt = expiredAt;
  }
}

import { License } from '../../domain/license.entity';
import { Account } from './../../../account/domain/account.entity';
import { LicenseBuilder } from './../../domain/license.domain.builder';

export class RegisterLicenseServiceDto {
  public number: string;

  public name: string;

  public user: Account;

  public birth: Date;

  public serialNumber: string;

  public expiredAt: Date;

  public async toDomain(): Promise<License> {
    const license = await new LicenseBuilder()
      .setNumber(this.number)
      .setName(this.name)
      .setBirth(this.birth)
      .setSerialNumber(this.serialNumber)
      .setUser(this.user)
      .setExpiredDate(this.expiredAt)
      .build();

    return license;
  }
}

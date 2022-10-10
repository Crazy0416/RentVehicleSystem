import { License } from '../../../domain/license.entity';
import { Account } from '../../../../account/domain/account.entity';
import { LicenseBuilder } from '../../../domain/license.domain.builder';
import { LicenseNumber } from '../../../domain/license-number.vo';

export class RegisterLicenseRequest {
  public number: string;

  public name: string;

  public user: Account;

  public birth: Date;

  public serialNumber: string;

  public expiredAt: Date;

  public async toDomain(): Promise<License> {
    const license = await new LicenseBuilder()
      .setNumber(new LicenseNumber(this.number))
      .setName(this.name)
      .setBirth(this.birth)
      .setSerialNumber(this.serialNumber)
      .setUser(this.user)
      .setExpiredDate(this.expiredAt)
      .build();

    return license;
  }
}

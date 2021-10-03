import { LicenseNumber } from './license-number.vo';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { License } from './license.entity';

export class LicenseBuilder {
  public number: LicenseNumber;

  public name: string;

  public birth: Date;

  public serialNumber: string;

  public userId: number;

  public setNumber(lincenseNumber: string) {
    this.number = new LicenseNumber(lincenseNumber);
  }

  public setName(userName: string) {
    this.name = userName;
  }

  public setBirth(userBirth: Date) {
    this.birth = userBirth;
  }

  public setSerialNumber(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public async build() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors[0].constraints[Object.keys(errors[0].constraints)[0]],
        `${JSON.stringify(errors[0].property)} validate 오류.`,
      );
    }

    return new License(this);
  }
}

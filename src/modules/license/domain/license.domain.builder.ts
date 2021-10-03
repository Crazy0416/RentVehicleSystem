import { LicenseNumber } from './license-number.vo';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { License } from './license.entity';
import { parse } from 'date-fns';

export class LicenseBuilder {
  public number: LicenseNumber;

  public name: string;

  public birth: Date;

  public serialNumber: string;

  public userId: number;

  public expiredAt: Date;

  public setNumber(lincenseNumber: string) {
    this.number = new LicenseNumber(lincenseNumber);
    return this;
  }

  public setName(userName: string) {
    this.name = userName;
    return this;
  }

  public setBirth(userBirth: Date);
  public setBirth(userBirth: string, format: string);
  public setBirth(userBirth: Date | string, format?: string) {
    if (typeof userBirth === 'string') {
      this.birth = parse(userBirth, format, new Date());
    } else {
      this.birth = userBirth;
    }
    return this;
  }

  public setSerialNumber(serialNumber: string) {
    this.serialNumber = serialNumber;
    return this;
  }

  public setExpiredDate(expiredAt: Date) {
    this.expiredAt = expiredAt;
    return this;
  }

  public setUserId(userId: number) {
    this.userId = userId;
    return this;
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

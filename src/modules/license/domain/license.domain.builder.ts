import { BadRequestException } from '@nestjs/common';
import {
  validate,
  IsNotEmpty,
  IsString,
  IsDate,
  Length,
  ValidateNested,
  IsOptional,
  IsNumber,
  Validate,
} from 'class-validator';
import { License } from './license.entity';
import { LicenseNumber } from './license-number.vo';
import { Account } from './../../account/domain/account.entity';
import { parseValidationErrorMessage } from '../../../util/parse-validation-error-message';
import { MinimumAge } from '../../../common/decorators/minimum-age.decorator';

export class LicenseBuilder {
  @ValidateNested({ message: '면허증 번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '면허증 번호를 입력하세요.' })
  public number: LicenseNumber;

  @IsString({ message: '이름을 입력하세요.' })
  @IsNotEmpty({ message: '이름을 입력하세요.' })
  public name: string;

  @ValidateNested({ message: '유저 정보 형식이 아닙니다.' })
  @IsOptional()
  public user?: Account;

  @IsNumber(undefined, { message: '유저 정보 형식이 아닙니다.' })
  @IsNotEmpty({ message: '유저 정보 형식이 아닙니다.' })
  public userId: number;

  @MinimumAge(18, { message: '만 18세 이상이여야 합니다.' })
  @IsDate({
    message: '생년월일 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '생년월일을 입력하세요.' })
  public birth: Date;

  @Length(6, 6, { message: '면허증 일련번호 형식이 아닙니다.' })
  @IsString({ message: '면허증 일련번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '면허증 일련번호를 입력하세요.' })
  public serialNumber: string;

  @IsDate({
    message: '만료일 날짜 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '만료일 날짜를 입력하세요.' })
  public expiredAt: Date;

  public setNumber(licenseNumber: LicenseNumber) {
    this.number = licenseNumber;
    return this;
  }

  public setName(userName: string) {
    this.name = userName;
    return this;
  }

  public setBirth(userBirth: Date): LicenseBuilder;
  public setBirth(userBirth: Date): LicenseBuilder {
    this.birth = userBirth;
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

  public setUser(user: Account) {
    this.user = user;
    if (user) {
      this.userId = user.getId();
    }
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
        parseValidationErrorMessage(errors),
        `${JSON.stringify(errors[0].property)} validate 오류.`,
      );
    }

    return new License(this);
  }
}

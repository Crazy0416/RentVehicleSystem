import { Matches, IsNotEmpty, IsString, Length, IsDate } from 'class-validator';
import { License } from '../../domain/license.entity';
import { LicenseBuilder } from './../../domain/license.domain.builder';

export class RegisterLicenseServiceDto {
  @Matches(/\d{2}-\d{2}-\d{6}-\d{2}/, {
    message: '면허증 번호 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '면허증 번호를 입력하세요.' })
  public number: string;

  @IsString({ message: '이름을 입력하세요.' })
  @IsNotEmpty({ message: '이름을 입력하세요.' })
  public name: string;

  public userId: number;

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

  public async toDomain(): Promise<License> {
    const license = await new LicenseBuilder()
      .setNumber(this.number)
      .setName(this.name)
      .setBirth(this.birth)
      .setSerialNumber(this.serialNumber)
      .setUserId(this.userId)
      .setExpiredDate(this.expiredAt)
      .build();

    return license;
  }
}

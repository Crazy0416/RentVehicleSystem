import {
  IsNotEmpty,
  ValidateNested,
  IsString,
  IsNumber,
  IsDate,
  Length,
  validateSync,
  IsOptional,
} from 'class-validator';
import { ConflictException } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { LicenseNumber } from './license-number.vo';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { LicenseBuilder } from './license.domain.builder';
import { Account } from './../../account/domain/account.entity';

@Entity('t_license')
export class License {
  constructor(builder?: LicenseBuilder) {
    if (builder) {
      this.number = builder.number;
      this.name = builder.name;
      this.birth = builder.birth;
      this.serialNumber = builder.serialNumber;
      if (this.user) {
        this.user = builder.user;
      }
      this.userId = builder.userId;
      this.expiredAt = builder.expiredAt;

      this.validateProperty();
    }
  }

  @IsOptional()
  @OneToOne(() => Account, { primary: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user?: Account;

  @IsNumber(undefined, { message: '유저 정보를 입력하세요.' })
  @IsNotEmpty({ message: '유저 정보를 입력하세요.' })
  @PrimaryColumn({ name: 'user_id' })
  public userId: number;

  @ValidateNested()
  @IsNotEmpty({ message: '면허증 번호를 입력하세요.' })
  @Column(() => LicenseNumber, { prefix: false })
  public number: LicenseNumber;

  @IsString({ message: '이름을 입력하세요.' })
  @IsNotEmpty({ message: '이름을 입력하세요.' })
  @Column()
  public name: string;

  @IsDate({
    message: '생년월일 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '생년월일을 입력하세요.' })
  @Column({ type: 'date' })
  public birth: Date;

  @Length(6, 6, { message: '면허증 일련번호 형식이 아닙니다.' })
  @IsString({ message: '면허증 일련번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '면허증 일련번호를 입력하세요.' })
  @Column({ name: 'serial_number' })
  public serialNumber: string;

  @IsDate({
    message: '만료일 날짜 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '만료일 날짜를 입력하세요.' })
  @Column({ name: 'expired_datetime', type: 'date' })
  public expiredAt: Date;

  private validateProperty() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors[0];
    }
  }

  public validate(): void {
    // 면허증 정보 검증
    this.validateProperty();

    // 면허증 만료일 검증
    if (this.isExpired()) {
      throw new ConflictException(
        '면허증이 만료됐습니다.',
        `${this.user.getId()} 유저의 면허증이 만료됐습니다.`,
      );
    }
  }

  public isExpired(): boolean {
    const now = new Date();
    if (isAfter(this.expiredAt, now)) {
      return false;
    }
    return true;
  }
}

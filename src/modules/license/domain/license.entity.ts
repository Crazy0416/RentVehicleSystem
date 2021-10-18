import { ConflictException } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { LicenseNumber } from './license-number.vo';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
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
      this.userId = builder.userId;
      this.expiredAt = builder.expiredAt;
    }
  }

  @OneToOne(() => Account, { primary: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public userId: number;

  @Column(() => LicenseNumber, { prefix: false })
  public number: LicenseNumber;

  @Column()
  public name: string;

  @Column({ type: 'date' })
  public birth: Date;

  @Column({ name: 'serial_number' })
  public serialNumber: string;

  @Column({ name: 'expired_datetime', type: 'date' })
  public expiredAt: Date;

  public validate(): void {
    // 면허증 번호 검증
    this.number.validateNumber();

    // 면허증 만료일 검증
    if (this.isExpired()) {
      throw new ConflictException(
        '면허증이 만료됐습니다.',
        `${this.userId} 유저의 면허증이 만료됐습니다.`,
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

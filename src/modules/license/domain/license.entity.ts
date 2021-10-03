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
    }
  }

  @OneToOne(() => Account, { primary: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public userId: number;

  @Column(() => LicenseNumber)
  public number: LicenseNumber;

  @Column()
  public name: string;

  @Column({ type: 'date' })
  public birth: Date;

  @Column({ name: 'serial_number' })
  public serialNumber: string;

  public verify() {
    // TODO: 본인 스스로 면허증이 검증 됐는지 확인해야 함
  }
}

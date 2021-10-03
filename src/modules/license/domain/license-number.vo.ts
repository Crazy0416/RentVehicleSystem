import { AfterLoad, Column } from 'typeorm';

export class LicenseNumber {
  constructor(numberStr: string) {
    // TODO: 저장 시 암호화 필수.
    this.number = numberStr;
    this.setNumberSet();
  }

  @Column({ unique: true })
  public number: string;

  public num1: string;

  public num2: string;

  public num3: string;

  public num4: string;

  @AfterLoad()
  private setNumberSet() {
    const numberSplit = this.number.split('-');
    this.num1 = numberSplit[0];
    this.num2 = numberSplit[1];
    this.num3 = numberSplit[2];
    this.num4 = numberSplit[3];
  }

  public validateNumber() {
    // TODO: 면허증 번호 형식 검증.
  }
}

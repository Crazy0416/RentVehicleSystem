import { AfterLoad, Column } from 'typeorm';
import { AesEncryptUtil } from './../../../core/utils/aes-encrypt/aes-encrypt-util';

export class LicenseNumber {
  private readonly encryptUtil = new AesEncryptUtil(
    process.env.AES_ENCRYPT_ALGORITHM,
    process.env.AES_ENCRYPT_KEY,
  );
  constructor(numberStr?: string) {
    if (numberStr) {
      this.iv = this.encryptUtil.generateIv();
      this.decryptNumber = numberStr;
      this.setEncryptNumber(numberStr);
      this.setNumberSet();
    }
  }

  @Column({ unique: true })
  public number: string;

  @Column({ comment: 'AES 복호화 시 사용하는 iv 값' })
  public iv: string;

  private decryptNumber: string;

  private num1: string;

  private num2: string;

  private num3: string;

  private num4: string;

  @AfterLoad()
  private afterLoad() {
    this.setDecryptNumber();
    this.setNumberSet();
  }

  private setDecryptNumber() {
    this.decryptNumber = this.encryptUtil.decode(this.number, this.iv);
  }

  @AfterLoad()
  private setNumberSet() {
    const numberSplit = this.decryptNumber.split('-');
    this.num1 = numberSplit[0];
    this.num2 = numberSplit[1];
    this.num3 = numberSplit[2];
    this.num4 = numberSplit[3];
  }

  private setEncryptNumber(number: string) {
    this.number = this.encryptUtil.encode(number, this.iv);
  }

  public validateNumber() {
    // TODO: 면허증 번호 형식 검증.
  }
}

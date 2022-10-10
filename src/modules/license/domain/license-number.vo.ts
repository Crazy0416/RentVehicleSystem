import { IsNotEmpty, Matches, IsString, validateSync } from 'class-validator';
import { AfterLoad, Column } from 'typeorm';
import { AesEncryptUtil } from './../../../core/utils/aes-encrypt/aes-encrypt-util';

export class LicenseNumber {
  /**
   * FIXME: nodejs 특성 상 process.env를 static 보다 늦게 불러온다.
   *        추후 방법을 찾으면 static 메서드로 변경하도록 한다.
   */
  private readonly encryptUtil = new AesEncryptUtil(
    process.env.AES_ENCRYPT_ALGORITHM,
    process.env.AES_ENCRYPT_KEY,
  );
  constructor(numberStr?: string) {
    if (numberStr) {
      this.number = numberStr;
      this.iv = this.encryptUtil.generateIv();
      this.decryptNumber = numberStr;
      this.setEncryptNumber(numberStr);
      this.setNumberSet();

      this.validateProperty();
    }
  }

  @Matches(/\d{2}-\d{2}-\d{6}-\d{2}/, {
    message: '면허증 번호 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '면허증 번호를 입력하세요.' })
  @Column({ unique: true })
  public number: string;

  @IsString({ message: '오류가 발생했습니다.' })
  @IsNotEmpty({ message: '오류가 발생했습니다.' })
  @Column({ comment: 'AES 복호화 시 사용하는 iv 값' })
  public iv: string;

  @Matches(/\d{2}-\d{2}-\d{6}-\d{2}/, {
    message: '면허증 번호 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '오류가 발생했습니다.' })
  private decryptNumber: string;

  private num1: string;

  private num2: string;

  private num3: string;

  private num4: string;

  private validateProperty() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors[0];
    }
  }

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
}

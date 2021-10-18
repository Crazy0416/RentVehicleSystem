import * as crypto from 'crypto';

export class AesEncryptUtil {
  // FIXME: process.env.AES_ENCRYPT_KEY를 불러오기 전에 static 변수가 할당되기 때문에 문제가 생김.
  // 현재는 인스턴스를 생성하지만 추후에 다른 방법을 찾도록 한다.
  constructor(
    private readonly algorithm: string,
    private readonly key: string,
  ) {
    if (this.algorithm === 'aes-256-cbc' && this.key.length !== 32) {
      throw new Error('AES 암호화 오류: key length 에러');
    }
    if (this.algorithm === 'aes-128-cbc' && this.key.length !== 16) {
      throw new Error('AES 암호화 오류: key length 에러');
    }
  }

  public generateIv(): string {
    return crypto.randomBytes(this.key.length / 4).toString('hex');
  }

  public encode(data: string, iv: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
  }

  public decode(encryptedData: string, iv: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    return (
      decipher.update(encryptedData, 'base64', 'utf8') + decipher.final('utf8')
    );
  }
}

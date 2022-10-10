import { IsNotEmpty, IsOptional, Matches, validateSync } from 'class-validator';
import { Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Password {
  @IsNotEmpty({ message: '비밀번호 입력이 필요합니다.' })
  @Column({ name: 'password' })
  public hashedPassword: string;

  @Matches(/^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: '비밀번호는 영문+숫자 포함 8~20자리입니다.',
  })
  @IsOptional()
  private originPassword?: string;

  constructor(plainPassword?: string) {
    if (plainPassword) {
      this.originPassword = plainPassword;
      this.hashedPassword = this.hashPasswordSync(plainPassword);
      const errors = validateSync(this);
      if (errors.length > 0) {
        throw errors[0];
      }
    }
  }

  private hashPasswordSync(plainPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.hashedPassword);
  }
}

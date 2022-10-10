import { BadRequestException } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  ValidationError,
} from 'class-validator';
import { Account } from './account.entity';

export class UserBuilder {
  @IsNumber(undefined, { message: '잘못된 유저 형식입니다.' })
  @IsOptional()
  public id: number;

  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일 입력이 필요합니다.' })
  public email: string;

  @IsString({ message: '비밀번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해야 합니다.' })
  public password: string;

  @IsString({ message: '이름 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이름을 입력해야 합니다.' })
  public name: string;

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  public setPassword(plainPassword: string) {
    this.password = plainPassword;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  async build() {
    try {
      return new Account(this);
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new BadRequestException(
          err.constraints[Object.keys(err.constraints)[0]],
          `${JSON.stringify(err.property)} validate 오류.`,
        );
      } else {
        throw err;
      }
    }
  }
}

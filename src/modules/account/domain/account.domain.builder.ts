import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  validate,
  IsEmail,
  IsLowercase,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Account } from './account.entity';

export class UserBuilder {
  @IsNumber(undefined, { message: '잘못된 유저 형식입니다.' })
  @IsOptional()
  public id: number;

  @IsLowercase({ message: '이메일 형식이 아닙니다.' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일 입력이 필요합니다.' })
  public email: string;

  @Matches(/^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: '비밀번호는 영문+숫자 포함 8~20자리입니다.',
  })
  @IsNotEmpty({ message: '비밀번호를 입력해야 합니다.' })
  public password: string;

  @MaxLength(30, { message: '이름 형식이 아닙니다.' })
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
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors[0].constraints[Object.keys(errors[0].constraints)[0]],
        `${JSON.stringify(errors[0].property)} validate 오류.`,
      );
    }

    return new Account(this);
  }
}

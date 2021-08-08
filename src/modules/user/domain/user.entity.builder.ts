import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validate,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

export class UserBuilder {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  setId(id: number) {
    this.id = id;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  async setPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    this.password = hashedPassword;
    return this;
  }

  setName(name: string) {
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
    return new User(this);
  }
}

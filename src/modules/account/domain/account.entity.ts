import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBuilder } from './account.domain.builder';
import * as bcrypt from 'bcrypt';
import {
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsLowercase,
  IsString,
  MaxLength,
  IsOptional,
  validateSync,
} from 'class-validator';

@Entity('t_user')
export class Account {
  constructor(builder?: UserBuilder) {
    if (builder) {
      this.id = builder.id;
      this.email = builder.email;
      this.hashedPassword = builder.password;
      this.name = builder.name;

      this.validate();
      this.hashedPassword = this.hashPasswordSync(builder.password);
    }
  }

  @IsNumber(undefined, { message: '잘못된 유저 형식입니다.' })
  @IsOptional()
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @IsLowercase({ message: '이메일 형식이 아닙니다.' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일 입력이 필요합니다.' })
  @Column({ unique: true })
  public email: string;

  @IsNotEmpty({ message: '비밀번호 입력이 필요합니다.' })
  @Column({ name: 'password' })
  public hashedPassword: string;

  @MaxLength(30, { message: '이름 형식이 아닙니다.' })
  @IsString({ message: '이름 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이름을 입력해야 합니다.' })
  @Column()
  public name: string;

  static get Builder() {
    return UserBuilder;
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  private validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors[0];
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

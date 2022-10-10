import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBuilder } from './account.domain.builder';
import {
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsLowercase,
  IsString,
  MaxLength,
  IsOptional,
  validateSync,
  ValidateNested,
} from 'class-validator';
import { Password } from './password.vo';

@Entity('t_user')
export class Account {
  constructor(builder?: UserBuilder) {
    if (builder) {
      this.id = builder.id;
      this.email = builder.email;
      this.password = new Password(builder.password);
      this.name = builder.name;

      this.validate();
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

  @ValidateNested()
  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @Column(() => Password, { prefix: false })
  public password: Password;

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

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return this.password.comparePassword(plainPassword);
  }
}

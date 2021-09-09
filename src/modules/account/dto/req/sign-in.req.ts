import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class SignInReq {
  @IsEmail(
    {},
    { message: '이메일 형식이 아닙니다.\n이메일을 다시 입력하세요.' },
  )
  @IsNotEmpty({ message: '이메일을 입력하세요.' })
  public readonly email: string;

  @Matches(/^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: '비밀번호는 영문+숫자 포함 8~20자리입니다.',
  })
  @IsNotEmpty({ message: '비밀번호를 입력하세요.' })
  public readonly password: string;
}

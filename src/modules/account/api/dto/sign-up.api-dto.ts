import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, IsString } from 'class-validator';
import { MatchProperty } from '../../../../common/decorators/match-property.decorator';

export class SignUpApiDto {
  @IsEmail(
    {},
    { message: '이메일 형식이 아닙니다.\n이메일을 다시 입력하세요.' },
  )
  @IsNotEmpty({ message: '이메일을 입력하세요.' })
  @Transform(({ value }) => value.toLowerCase().trim())
  public readonly email: string;

  @IsNotEmpty({ message: '비밀번호를 입력하세요.' })
  @Transform(({ value }) => value.trim())
  public readonly password: string;

  @MatchProperty('password', { message: '같은 비밀번호를 입력해야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력하세요.' })
  @Transform(({ value }) => value.trim())
  public readonly passwordCheck: string;

  @IsString({ message: '이름을 입력하세요.' })
  @IsNotEmpty({ message: '이름을 입력하세요.' })
  public readonly name: string;
}

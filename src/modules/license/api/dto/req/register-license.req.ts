import { BadRequestException } from '@nestjs/common';
import { parse } from 'date-fns';
import {
  Matches,
  IsNotEmpty,
  IsString,
  Length,
  validate,
} from 'class-validator';
import { RegisterLicenseServiceDto } from './../../../application/dto';

export class RegisterLicenseReq {
  @Matches(/\d{2}-\d{2}-\d{6}-\d{2}/, {
    message: '면허증 번호 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '면허증 번호를 입력하세요.' })
  public number: string;

  @IsString({ message: '이름을 입력하세요.' })
  @IsNotEmpty({ message: '이름을 입력하세요.' })
  public name: string;

  @Matches(/([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/, {
    message: '생년월일 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '생년월일을 입력하세요.' })
  public birth: string;

  @Length(6, 6, { message: '면허증 일련번호 형식이 아닙니다.' })
  @IsString({ message: '면허증 일련번호 형식이 아닙니다.' })
  @IsNotEmpty({ message: '면허증 일련번호를 입력하세요.' })
  public serialNumber: string;

  @Matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: '만료일 날짜 형식이 아닙니다.',
  })
  @IsNotEmpty({ message: '만료일 날짜를 입력하세요.' })
  public expiredAt: string;

  public async toServiceDto(userId: number) {
    const dto = new RegisterLicenseServiceDto();
    dto.number = this.number;
    dto.serialNumber = this.serialNumber;
    dto.birth = parse(this.birth, 'yymmdd', new Date());
    dto.expiredAt = parse(this.birth, 'yyyy-mm-dd', new Date());
    dto.userId = userId;

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors[0].constraints[Object.keys(errors[0].constraints)[0]],
        `${RegisterLicenseServiceDto.name} ${JSON.stringify(
          errors[0].property,
        )} validate 오류.`,
      );
    }

    return dto;
  }
}

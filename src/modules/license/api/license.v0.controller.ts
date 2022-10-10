import { DefaultResponseRes } from './../../../common/dto/res/default-response.res';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterLicenseApiDto } from './dto';
import { Account } from './../../account/domain/account.entity';
import { RegisterLicenseAppService } from '../application/register-license.app-service';
import { UserDecorator } from './../../../common/decorators/user.decorator';
import { RegisterLicenseRequest } from '../application/dto/request';
import { parse } from 'date-fns';

@Controller('/v0/license')
export class LicenseV0Controller {
  constructor(
    private readonly registerLicenseAppService: RegisterLicenseAppService,
  ) {}

  /**
   * @param {RegisterLicenseApiDto} dto
   * @param {Account} account
   * @returns {Promise<DefaultResponseRes>}
   * @memberof LicenseV0Controller
   * @description 사용자 계정의 운전면허증을 등록하는 API.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  public async registerLicense(
    @Body() dto: RegisterLicenseApiDto,
    @UserDecorator() account: Account,
  ): Promise<DefaultResponseRes> {
    const birth = parse(dto.birth, 'yymmdd', new Date());
    await this.registerLicenseAppService.register(
      new RegisterLicenseRequest(
        dto.number,
        dto.name,
        account,
        birth,
        dto.serialNumber,
        new Date(dto.expiredAt),
      ),
    );
    return {
      msg: '면허증 등록 완료.',
    };
  }
}

import { DefaultResponseRes } from './../../../common/dto/res/default-response.res';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterLicenseReq } from './../dto/req/register-license.req';
import { Account } from './../../account/domain/account.entity';
import { RegisterLicenseService } from './../application/register-license.service';
import { UserDecorator } from './../../../common/decorators/user.decorator';

@Controller('/v0/license')
export class LicenseV0Controller {
  constructor(
    private readonly registerLicenseService: RegisterLicenseService,
  ) {}

  /**
   * @param {RegisterLicenseReq} dto
   * @param {Account} account
   * @returns {Promise<DefaultResponseRes>}
   * @memberof LicenseV0Controller
   * @description 사용자 계정의 운전면허증을 등록하는 API.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  public async registerLicense(
    @Body() dto: RegisterLicenseReq,
    @UserDecorator() account: Account,
  ): Promise<DefaultResponseRes> {
    await this.registerLicenseService.register(dto, account);
    return {
      msg: '면허증 등록 완료.',
    };
  }
}

import { SignService } from './../application/sign.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignUpReq, SignInReq } from './../dto/req';
import { SignInRes } from './../dto/res/sign-in.res';

@Controller('/v0/account')
export class AccountV0Controller {
  constructor(private readonly signService: SignService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReq) {
    return await this.signService.signUp(dto);
  }

  /**
   * @param {SignInReq} dto
   * @returns {Promise<SignInRes>}
   * @memberof AccountV0Controller
   * @description 사용자 로그인 API.
   */
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReq): Promise<SignInRes> {
    return await this.signService.signIn(dto);
  }
}

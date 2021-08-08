import { SignService } from './../application/sign.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignUpReq } from './../dto/req';

@Controller('/v0/account')
export class AccountV0Controller {
  constructor(private readonly signService: SignService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReq) {
    return await this.signService.signUp(dto);
  }
}

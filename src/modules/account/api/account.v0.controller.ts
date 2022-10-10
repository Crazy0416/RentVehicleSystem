import { SignService } from './../application/sign.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './../../auth/local-auth.guard';
import { Account } from './../domain/account.entity';
import { SignUpReq } from './dto/req';
import { SignInRes } from './dto/res/sign-in.res';
import { SignInServiceDto, SignUpServiceDto } from '../application/dto';

@Controller('/v0/account')
export class AccountV0Controller {
  constructor(private readonly signService: SignService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReq) {
    return await this.signService.signUp(
      new SignUpServiceDto(dto.email, dto.password, dto.name),
    );
  }

  /**
   * @param {SignInReq} dto
   * @returns {Promise<SignInRes>}
   * @memberof AccountV0Controller
   * @description 사용자 로그인 API.
   */
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  public async signIn(@Req() req: Request): Promise<SignInRes> {
    const account = req.user as Account;
    return await this.signService.signIn(new SignInServiceDto(account));
  }
}

import { SignAppService } from '../application/sign.app-service';
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
import { SignUpApiDto } from './dto';
import { SignInResponse } from '../application/dto/response/sign-in.response';
import { SignInRequest, SignUpRequest } from '../application/dto/request';

@Controller('/v0/account')
export class AccountV0Controller {
  constructor(private readonly signAppService: SignAppService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: SignUpApiDto) {
    return this.signAppService.signUp(
      new SignUpRequest(dto.email, dto.password, dto.name),
    );
  }

  /**
   * @param {Request} req
   * @returns {Promise<SignInResponse>}
   * @memberof AccountV0Controller
   * @description 사용자 로그인 API.
   */
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  public async signIn(@Req() req: Request): Promise<SignInResponse> {
    const account = req.user as Account;
    return this.signAppService.signIn(new SignInRequest(account));
  }
}

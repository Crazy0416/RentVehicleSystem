import { JwtService } from '@nestjs/jwt';
import { AccountService } from './../domain/account.service';
import { Injectable } from '@nestjs/common';
import { SignUpReq } from './../dto/req';
import { SignUpRes } from './../dto/res';

@Injectable()
export class SignService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  public async signUp(dto: SignUpReq) {
    const createdAccount = await dto.toAccountDomain();
    const savedAccount = await this.accountService.signUpAccount(
      createdAccount,
    );

    const token = await this.jwtService.signAsync(
      { id: savedAccount.getId() },
      { algorithm: 'HS512', issuer: 'rent-vehicle-system' },
    );

    return new SignUpRes(token);
  }
}

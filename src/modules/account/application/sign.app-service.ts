import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../domain/account.service';
import { DbAccountRepository } from '../infrastructure/db-account.repository';
import { AccountRepository } from '../domain/account.repository';
import { Account } from '../domain/account.entity';
import { SignInRequest, SignUpRequest } from './dto/request';
import { SignUpResponse, SignInResponse } from './dto/response';

@Injectable()
export class SignAppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    @Inject(DbAccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  public async signUp(dto: SignUpRequest): Promise<SignUpResponse> {
    const account = await new Account.Builder()
      .setEmail(dto.email)
      .setName(dto.name)
      .setPassword(dto.password)
      .build();

    // validate
    if (await this.accountRepository.checkExist(account)) {
      throw new ConflictException(
        '이미 가입된 계정입니다.',
        `${account.getEmail()} 계정은 이미 가입된 계정입니다.`,
      );
    }
    const savedAccount = await this.accountRepository.save(account);

    const token = await this.jwtService.signAsync(
      { id: savedAccount.getId() },
      { algorithm: 'HS512', issuer: 'rent-vehicle-system' },
    );

    return new SignUpResponse(token);
  }

  /**
   * @param {SignInRequest} dto
   * @returns {Promise<SignInResponse>}
   * @memberof SignService
   * @description 사용자 로그인 서비스.
   *              이메일 및 비밀번호로 계정을 찾은 뒤 로그인 진행.
   *              로그인 후 jwt 토큰 발행.
   */
  public async signIn(dto: SignInRequest): Promise<SignInResponse> {
    const account = dto.account;

    const token = await this.jwtService.signAsync(
      // TODO: payload 형식을 회원가입할 때 동일하게 할 필요가 있음.
      { id: account.getId() },
      { algorithm: 'HS512', issuer: 'rent-vehicle-system' },
    );

    return new SignInResponse(token);
  }
}

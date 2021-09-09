import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from './account.entity';

export type Token = string;

export class Authenticate {
  constructor(
    private readonly account: Account,
    private readonly jwtService: JwtService,
  ) {
    if (!account) {
      throw new BadRequestException(
        '아이디 혹은 비밀번호를 확인하세요.',
        '계정이 존재하지 않습니다.',
      );
    }
  }

  // TODO: 회원가입 비즈니스 로직을 넣는 건 어떨까?

  /**
   * @param {string} plainPassword
   * @returns {Promise<Token>}
   * @memberof Authenticate
   * @description 로그인 비즈니스 로직
   */
  public async signIn(plainPassword: string): Promise<Token> {
    if (this.account.comparePassword(plainPassword)) {
      return this.jwtService.signAsync(
        // TODO: payload 형식을 회원가입할 때 동일하게 할 필요가 있음.
        { id: this.account.getId() },
        { algorithm: 'HS512', issuer: 'rent-vehicle-system' },
      );
    } else {
      throw new BadRequestException('아이디 혹은 비밀번호를 확인하세요.');
    }
  }
}

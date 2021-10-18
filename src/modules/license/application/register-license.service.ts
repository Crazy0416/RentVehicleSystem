import { Inject, Injectable } from '@nestjs/common';
import { License } from './../domain/license.entity';
import { LicenseRepository } from './../domain/license.repository';
import { DbLicenseRepository } from './../infrastructure/db-license.repository';
import { LicenseBuilder } from './../domain/license.domain.builder';
import { ValidateLicenseService } from './../domain/validate-license.service';
import { Account } from './../../account/domain/account.entity';
import { RegisterLicenseReq } from './../dto/req/register-license.req';

@Injectable()
export class RegisterLicenseService {
  constructor(
    private readonly validateLicenseService: ValidateLicenseService,
    @Inject(DbLicenseRepository)
    private readonly licenseRepository: LicenseRepository,
  ) {}

  /**
   * @param {RegisterLicenseReq} dto
   * @param {Account} account
   * @returns {Promise<License>}
   * @memberof RegisterLicenseService
   * @description account 계정의 운전 면허증을 등록하는 서비스.
   *              등록 전 면허증을 검증하는 단계를 거침.
   */
  public async register(
    dto: RegisterLicenseReq,
    account: Account,
  ): Promise<License> {
    const license = await new LicenseBuilder()
      .setNumber(dto.number)
      .setName(dto.name)
      .setBirth(dto.birth, 'yymmdd')
      .setSerialNumber(dto.serialNumber)
      .setUserId(account.getId())
      .setExpiredDate(new Date(dto.expiredAt))
      .build();

    // 운전 면허증 진위 여부 검증
    await this.validateLicenseService.validate(license);

    try {
      const savedLicense = await this.licenseRepository.save(license);
      return savedLicense;
    } catch (err) {
      if (err.code && err.code === '23505') {
        // DISCUSS: 엔티티가 이미 있으니 경고 메세지만?
      } else {
        throw err;
      }
    }
  }
}

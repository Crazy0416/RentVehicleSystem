import { RegisterLicenseRequest } from './dto/request';
import { Inject, Injectable } from '@nestjs/common';
import { License } from '../domain/license.entity';
import { LicenseRepository } from '../domain/license.repository';
import { DbLicenseRepository } from '../infrastructure/db-license.repository';
import { ValidateLicenseService } from '../domain/validate-license.service';
import { LicenseNumber } from '../domain/license-number.vo';

@Injectable()
export class RegisterLicenseAppService {
  constructor(
    private readonly validateLicenseService: ValidateLicenseService,
    @Inject(DbLicenseRepository)
    private readonly licenseRepository: LicenseRepository,
  ) {}

  /**
   * @param {RegisterLicenseRequest} dto
   * @returns {Promise<void>}
   * @memberof RegisterLicenseService
   * @description account 계정의 운전 면허증을 등록하는 서비스.
   *              등록 전 면허증을 검증하는 단계를 거침.
   */
  public async register(dto: RegisterLicenseRequest): Promise<void> {
    const license = await new License.Builder()
      .setNumber(new LicenseNumber(dto.number))
      .setName(dto.name)
      .setBirth(dto.birth)
      .setSerialNumber(dto.serialNumber)
      .setUser(dto.user)
      .setExpiredDate(dto.expiredAt)
      .build();

    // 운전 면허증 진위 여부 검증
    await this.validateLicenseService.validate(license);

    await this.licenseRepository.save(license);
  }
}

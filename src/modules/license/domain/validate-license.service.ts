import { Injectable } from '@nestjs/common';
import { License } from './license.entity';

@Injectable()
export class ValidateLicenseService {
  /**
   * @param {License} license
   * @returns {Promise<void>}
   * @memberof ValidateLicenseService
   * @description 운전 면허증 진위 여부 검증 서비스.
   *              면허증에 문제가 없는 경우 return;
   */
  public async validate(license: License): Promise<void> {
    license.validate();

    // TODO: 경찰청 운전면허증 인증 API.
  }
}

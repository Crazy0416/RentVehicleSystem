import { License } from './license.entity';
import { FindOneOptions } from 'typeorm';

export interface LicenseRepository {
  findOne(options?: FindOneOptions<License>): Promise<License>;
  save(license: License): Promise<License>;
}

import { Repository, EntityRepository } from 'typeorm';
import { License } from './../domain/license.entity';
import { LicenseRepository } from './../domain/license.repository';

@EntityRepository(License)
export class DbLicenseRepository extends Repository<License>
  implements LicenseRepository {}

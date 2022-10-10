import { ValidateLicenseService } from './domain/validate-license.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LicenseV0Controller } from './api/license.v0.controller';
import { RegisterLicenseAppService } from './application/register-license.app-service';
import { DbLicenseRepository } from './infrastructure/db-license.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DbLicenseRepository])],
  controllers: [LicenseV0Controller],
  providers: [RegisterLicenseAppService, ValidateLicenseService],
  exports: [TypeOrmModule],
})
export class LicenseModule {}

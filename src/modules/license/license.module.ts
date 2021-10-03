import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LicenseV0Controller } from './api/license.v0.controller';
import { RegisterLicenseService } from './application/register-license.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [LicenseV0Controller],
  providers: [RegisterLicenseService],
  exports: [TypeOrmModule],
})
export class AccountModule {}

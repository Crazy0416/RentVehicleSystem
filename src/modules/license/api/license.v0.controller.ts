import { Controller } from '@nestjs/common';
import { RegisterLicenseService } from './../application/register-license.service';

@Controller('/v0/license')
export class LicenseV0Controller {
  constructor(
    private readonly registerLicenseService: RegisterLicenseService,
  ) {}
}

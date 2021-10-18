import { plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  validateSync,
  IsOptional,
} from 'class-validator';

class EnvironmentVariables {
  @IsString({ message: 'database.config 타입 설정 필요.' })
  @IsNotEmpty({ message: 'database.config 타입 설정 필요.' })
  DB_TYPE: string;

  @IsString({ message: 'database.config host 설정 필요.' })
  @IsNotEmpty({ message: 'database.config host 설정 필요.' })
  DB_HOST: string;

  @IsString({ message: 'database.config username 설정 필요.' })
  @IsNotEmpty({ message: 'database.config username 설정 필요.' })
  DB_USER: string;

  @IsString({ message: 'database.config password 설정 필요.' })
  @IsNotEmpty({ message: 'database.config password 설정 필요.' })
  DB_PASSWORD: string;

  @IsString({ message: 'database.config database 설정 필요.' })
  @IsNotEmpty({ message: 'database.config database 설정 필요.' })
  DB_DATABASE: string;

  @IsString({ message: 'auth.config secret 설정 필요' })
  @IsNotEmpty({ message: 'auth.config secret 설정 필요' })
  AUTH_TOKEN_PASSWORD: string;

  @IsOptional()
  AUTH_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty({ message: 'aes-encrypt key 설정 필요' })
  AES_ENCRYPT_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      errors.map(error => Object.values(error.constraints).join()).toString(),
    );
  }
  return config;
}

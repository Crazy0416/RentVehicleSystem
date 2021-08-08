import { join } from 'path';

export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    entities: [join(__dirname, '../modules/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../infra/database/migrations/*{.ts,.js}')],
    cli: {
      migrationsDir: 'migration',
    },
    retryAttempts: 2,
  },
  auth: {
    secret: process.env.AUTH_TOKEN_PASSWORD,
    signOptions: {
      expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN || '90 days',
    },
  },
});

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
    retryAttempts: 2,
  },
});

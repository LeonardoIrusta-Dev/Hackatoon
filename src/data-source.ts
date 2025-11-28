import { DataSource } from 'typeorm';
import path from 'path';
import { databaseConfig } from './config/database.config';

export const AppDataSource = new DataSource({
  type: databaseConfig.type,
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: databaseConfig.synchronize,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  options: {
    encrypt: databaseConfig.encrypt,
    trustServerCertificate: true,
  },
});

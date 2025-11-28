export interface DatabaseConfig {
  type: 'mssql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  encrypt: boolean;
}

export const databaseConfig: DatabaseConfig = {
  type: 'mssql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 1433,
  username: process.env.DATABASE_USERNAME || 'sa',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'mydatabase',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  encrypt: process.env.DATABASE_ENCRYPT === 'true',
};

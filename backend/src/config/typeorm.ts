import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Department } from '../departments/department.entity';
import { Employee } from '../employees/entities/employee.entity';

dotenvConfig({ path: '.env' });

const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const config = {
  type: 'postgres',
  host: `${DB_HOST}`,
  port: `${DB_PORT}`,
  username: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  database: `${DB_NAME}`,
  entities: [Employee, Department], // TODO: check if autoLoadEntities is enough
  migrations: ['src/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

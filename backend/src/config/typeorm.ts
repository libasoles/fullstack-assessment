import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Department } from '../departments/Department.entity';
import { Address } from '../employees/Address.entity';
import { Employee } from '../employees/Employee.entity';

dotenvConfig({ path: '.env' });

const { DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const config = {
  type: 'postgres',
  host: 'db',
  port: `${DB_PORT}`,
  username: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  database: `${DB_NAME}`,
  entities: [Employee, Address, Department], // TODO: check if autoLoadEntities is enough
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

import { MigrationInterface, QueryRunner } from 'typeorm';

const createDepartmentTable = `
CREATE TABLE IF NOT EXISTS department
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
)
`;

const createEmployeeTable = `
CREATE TABLE IF NOT EXISTS employee
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
)
`;

export class CreateTables1717450696248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(createDepartmentTable);
    await queryRunner.query(createEmployeeTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS employee`);
    await queryRunner.query(`DROP TABLE IF EXISTS department`);
  }
}

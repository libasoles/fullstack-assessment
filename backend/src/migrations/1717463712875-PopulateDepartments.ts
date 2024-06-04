import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateDepartments1717463712875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO department(name) 
        VALUES ('Engineering'), ('Sales'), ('Marketing'), ('Finance'), ('HR'), ('Legal'), ('Operations'), ('Customer Service')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM department`);
  }
}

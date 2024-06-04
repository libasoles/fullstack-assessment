import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeDeactivation1717536638939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE employee ADD COLUMN is_active BOOLEAN DEFAULT TRUE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE employee DROP COLUMN is_active');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

const tableName = 'department_changes';

export class CreateHistoryTable1717591166410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          { name: 'employee_id', type: 'int' },
          { name: 'department_id', type: 'int' },
          { name: 'date', type: 'date', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employee',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['department_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'department',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      tableName,
      new TableIndex({
        name: 'EMPLOYEE_DEPARTMENT',
        columnNames: ['employee_id', 'department_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}

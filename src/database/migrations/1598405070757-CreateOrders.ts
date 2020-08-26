import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrders1598405070757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'filial_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'client_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'subtotal',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}

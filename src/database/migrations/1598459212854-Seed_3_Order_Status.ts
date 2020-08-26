import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed3OrderStatus1598459212854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Processing',
      })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Finished',
      })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Cancelled',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('order_status')
      .where({ name: 'Processing' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('order_status')
      .where({ name: 'Finished' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('order_status')
      .where({ name: 'Cancelled' })
      .execute();
  }
}

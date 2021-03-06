import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed3OrderStatus1598459212854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Processing',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Waiting Payment',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        name: 'Finished',
      })
      .execute();

    await queryRunner.manager
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
      .where({ name: 'Waiting Payment' })
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

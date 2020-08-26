import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed2ProductCategory1598452392955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product_category')
      .values({
        name: 'Adventure',
      })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product_category')
      .values({
        name: 'Science',
      })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product_category')
      .values({
        name: 'Romance',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('product_category')
      .where({ name: 'Adventure' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('product_category')
      .where({ name: 'Science' })
      .execute();

    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('product_category')
      .where({ name: 'Romance' })
      .execute();
  }
}

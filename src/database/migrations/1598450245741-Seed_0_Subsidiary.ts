import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed0Subsidiary1598450245741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('subsidiary')
      .values({
        name: 'Recife I',
        address: 'Avenida Domingos Ferreira 134',
        owner: 'Homer Simpson',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('subsidiary')
      .where({ name: 'Recife I' })
      .execute();
  }
}

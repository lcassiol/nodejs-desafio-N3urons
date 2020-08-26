import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

export class Seed1Users1598451129273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await hash('cassio123', 8);

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        login: 'vendedor1',
        name: 'Bender',
        password: passwordHash,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where({ login: 'vendedor1' })
      .execute();
  }
}

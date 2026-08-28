import { MigrationInterface, QueryRunner } from 'typeorm'

export class EnableSearchExtensions1787892680094
  implements MigrationInterface {
  name = 'EnableSearchExtensions1787892680094'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "unaccent"`)
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pg_trgm"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "pg_trgm"`)
    await queryRunner.query(`DROP EXTENSION IF EXISTS "unaccent"`)
  }
}
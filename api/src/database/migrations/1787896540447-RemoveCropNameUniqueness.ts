import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveCropNameUniqueness1787896540447 implements MigrationInterface {
  name = 'RemoveCropNameUniqueness1787896540447'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      DECLARE
        idx_name text;
      BEGIN
        SELECT indexname INTO idx_name
        FROM pg_indexes
        WHERE tablename = 'crop'
          AND indexdef ILIKE '%"name"%'
          AND indexdef ILIKE '%UNIQUE%'
        ORDER BY indexname
        LIMIT 1;

        IF idx_name IS NOT NULL THEN
          EXECUTE format('DROP INDEX "%I"', idx_name);
        END IF;
      END $$;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_crop_name" ON "crop" ("name")`,
    )
  }
}
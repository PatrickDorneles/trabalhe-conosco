import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveHarvestYearUniqueness1787860748224
  implements MigrationInterface {
  name = 'RemoveHarvestYearUniqueness1787860748224'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      DECLARE
        idx_name text;
      BEGIN
        SELECT indexname INTO idx_name
        FROM pg_indexes
        WHERE tablename = 'harvest'
          AND indexdef ILIKE '%"year"%'
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
      `CREATE UNIQUE INDEX "UQ_harvest_year" ON "harvest" ("year")`,
    )
  }
}

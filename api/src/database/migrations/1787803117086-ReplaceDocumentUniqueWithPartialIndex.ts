import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReplaceDocumentUniqueWithPartialIndex1787803117086
  implements MigrationInterface
{
  name = 'ReplaceDocumentUniqueWithPartialIndex1787803117086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT IF EXISTS "UQ_61a17aa60853bb7c14d7bdb4c85"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_producer_document_active" ON "producer" ("document") WHERE "deletedAt" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_producer_document_active"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "UQ_producer_document" UNIQUE ("document")`,
    );
  }
}

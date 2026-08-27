import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimestampsAndSoftDelete1787796709304
  implements MigrationInterface
{
  name = 'AddTimestampsAndSoftDelete1787796709304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "producer"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "rural_property"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "crop"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "harvest"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "producer_crop"
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "deletedAt" TIMESTAMP NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer_crop" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crop" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rural_property" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "deletedAt", DROP COLUMN "updatedAt", DROP COLUMN "createdAt"`,
    );
  }
}

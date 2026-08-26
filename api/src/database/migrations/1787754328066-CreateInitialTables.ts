import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1787754328066 implements MigrationInterface {
  name = 'CreateInitialTables1787754328066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR NOT NULL,
        "email" VARCHAR NOT NULL UNIQUE,
        "passwordHash" VARCHAR NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "producer" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR NOT NULL,
        "document" VARCHAR NOT NULL UNIQUE,
        "farmName" VARCHAR NOT NULL,
        "city" VARCHAR NOT NULL,
        "state" VARCHAR NOT NULL,
        "totalArea" DECIMAL(10,2) NOT NULL,
        "arableArea" DECIMAL(10,2) NOT NULL,
        "vegetationArea" DECIMAL(10,2) NOT NULL
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "crop" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR NOT NULL UNIQUE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "harvest" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "year" INTEGER NOT NULL,
        "producerId" UUID NOT NULL,
        CONSTRAINT "FK_harvest_producer" FOREIGN KEY ("producerId") REFERENCES "producer"("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "producer_crop" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "producerId" UUID NOT NULL,
        "harvestId" UUID NOT NULL,
        "cropId" UUID NOT NULL,
        CONSTRAINT "FK_producer_crop_producer" FOREIGN KEY ("producerId") REFERENCES "producer"("id"),
        CONSTRAINT "FK_producer_crop_harvest" FOREIGN KEY ("harvestId") REFERENCES "harvest"("id"),
        CONSTRAINT "FK_producer_crop_crop" FOREIGN KEY ("cropId") REFERENCES "crop"("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "producer_crop"`);
    await queryRunner.query(`DROP TABLE "harvest"`);
    await queryRunner.query(`DROP TABLE "crop"`);
    await queryRunner.query(`DROP TABLE "producer"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestructureRuralProperty1787776348051
  implements MigrationInterface {
  name = 'RestructureRuralProperty1787776348051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "producer_crop"`);
    await queryRunner.query(`DROP TABLE "harvest"`);
    await queryRunner.query(`DROP TABLE "crop"`);
    await queryRunner.query(`DROP TABLE "producer"`);

    await queryRunner.query(`
      CREATE TABLE "producer" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR NOT NULL,
        "document" VARCHAR NOT NULL UNIQUE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "rural_property" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "farmName" VARCHAR NOT NULL,
        "city" VARCHAR NOT NULL,
        "state" VARCHAR NOT NULL,
        "totalArea" DECIMAL(10,2) NOT NULL,
        "arableArea" DECIMAL(10,2) NOT NULL,
        "vegetationArea" DECIMAL(10,2) NOT NULL,
        "producerId" UUID NOT NULL,
        CONSTRAINT "FK_rural_property_producer"
          FOREIGN KEY ("producerId")
          REFERENCES "producer"("id")
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
        "year" INTEGER NOT NULL UNIQUE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "producer_crop" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "ruralPropertyId" UUID NOT NULL,
        "harvestId" UUID NOT NULL,
        "cropId" UUID NOT NULL,
        CONSTRAINT "FK_producer_crop_rural_property"
          FOREIGN KEY ("ruralPropertyId")
          REFERENCES "rural_property"("id"),
        CONSTRAINT "FK_producer_crop_harvest"
          FOREIGN KEY ("harvestId")
          REFERENCES "harvest"("id"),
        CONSTRAINT "FK_producer_crop_crop"
          FOREIGN KEY ("cropId")
          REFERENCES "crop"("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "producer_crop"`);
    await queryRunner.query(`DROP TABLE "harvest"`);
    await queryRunner.query(`DROP TABLE "crop"`);
    await queryRunner.query(`DROP TABLE "rural_property"`);
    await queryRunner.query(`DROP TABLE "producer"`);
  }
}

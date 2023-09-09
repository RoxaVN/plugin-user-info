import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPluginUserInfo1694247083709 implements MigrationInterface {
  name = 'InitPluginUserInfo1694247083709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "birthday" TIMESTAMP WITH TIME ZONE
      `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "firstName" text
      `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "lastName" text
      `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "middleName" text
      `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "gender" character varying(16)
      `);
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "avatar" jsonb
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "avatar"
      `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "gender"
      `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "middleName"
      `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "lastName"
      `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "firstName"
      `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "birthday"
      `);
  }
}

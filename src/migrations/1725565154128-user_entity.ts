import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1725565154128 implements MigrationInterface {
    name = 'UserEntity1725565154128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "deletedAt" TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "blockedAt" TIMESTAMP,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "unique_user_email" ON "user" ("email")
            WHERE "deletedAt" is null
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."unique_user_email"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}

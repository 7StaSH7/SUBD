import {MigrationInterface, QueryRunner} from "typeorm";

export class edit1654238829081 implements MigrationInterface {
    name = 'edit1654238829081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "start" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "end" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "end" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "route" ADD "start" date NOT NULL`);
    }

}

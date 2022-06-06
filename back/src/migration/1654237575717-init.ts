import {MigrationInterface, QueryRunner} from "typeorm";

export class init1654237575717 implements MigrationInterface {
    name = 'init1654237575717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "route" ("id" SERIAL NOT NULL, "name" text NOT NULL, "start" date NOT NULL, "end" date NOT NULL, "busId" integer, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bus" ("id" SERIAL NOT NULL, "name" text NOT NULL, "driver" text NOT NULL, CONSTRAINT "PK_bd7b8b319eb7958e876584d02d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_244756c4b4f088ecc36fe968e87" FOREIGN KEY ("busId") REFERENCES "bus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_244756c4b4f088ecc36fe968e87"`);
        await queryRunner.query(`DROP TABLE "bus"`);
        await queryRunner.query(`DROP TABLE "route"`);
    }

}

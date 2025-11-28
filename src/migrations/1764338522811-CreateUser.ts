import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1764338522811 implements MigrationInterface {
    name = 'CreateUser1764338522811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Usuario" ("CreatedAt" datetime2 NOT NULL CONSTRAINT "DF_b2bf21f797b19191c6ee781d7fc" DEFAULT getdate(), "CreatedUserId" int, "UpdatedAt" datetime2 CONSTRAINT "DF_9d44f37b4e5cdd1925f0198c0a1" DEFAULT getdate(), "UpdatedUserId" int, "DeletedAt" datetime2, "DeletedUserId" int, "Id" int NOT NULL IDENTITY(1,1), "Nombre" nvarchar(255), "Apellido" nvarchar(255), "Email" nvarchar(255), "NroDocumento" nvarchar(255), "Telefono" nvarchar(255), CONSTRAINT "PK_63bb41c4f32013353061f32c561" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Usuario"`);
    }

}

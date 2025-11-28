import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePersonal1759169271050 implements MigrationInterface {
  name = 'CreatePersonal1759169271050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Personal" ("Id" int NOT NULL IDENTITY(1,1), "Nombre" nvarchar(255), "Apellido" nvarchar(255), "Email" nvarchar(255), "NroDocumento" nvarchar(255), "Teleono" nvarchar(255), "Activo" bit, CONSTRAINT "PK_0c5a5bf9c64fcae1dbdd346d960" PRIMARY KEY ("Id"), "CreatedAt" datetime2 NOT NULL CONSTRAINT "DF_a77bfa77a2db298e244ad577e90" DEFAULT getdate(), "CreatedUserId" int, "UpdatedAt" datetime2 CONSTRAINT "DF_241446ff3bc7a6c058635878b1d" DEFAULT getdate(), "UpdatedUserId" int, "DeletedAt" datetime2, "DeletedUserId" int)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Personal"`);
  }
}

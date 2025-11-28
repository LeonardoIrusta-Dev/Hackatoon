import { MigrationInterface, QueryRunner } from "typeorm";

export class CredencialesInserts1700000001001 implements MigrationInterface {
    name = 'CredencialesInserts1700000001001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
INSERT INTO Areas (Nombre,Descripcion,Fec_Alta,Usr_Alta,Fec_Modif,Usr_Modif,Fec_Baja,Usr_Baja) VALUES
        (N'Sistemas',N'Area de sistemas','2025-11-28 15:23:33.413',N'sistemas',NULL,NULL,NULL,NULL),
        (N'Recursos humanos',N'Area de recursos humanos','2025-11-28 15:23:33.430',N'sistemas',NULL,NULL,NULL,NULL),
        (N'Adminitracion',N'Area de administracion','2025-11-28 15:23:33.434',N'sistemas',NULL,NULL,NULL,NULL);
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM Areas`);
    }
}
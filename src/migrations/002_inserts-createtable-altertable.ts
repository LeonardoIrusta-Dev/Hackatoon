import { MigrationInterface, QueryRunner } from "typeorm";

export class CredencialesInserts1700000001000 implements MigrationInterface {
    name = 'CredencialesInserts1700000001000'

    public async up(queryRunner: QueryRunner): Promise<void> {

        // =========================
        // TABLA CREDENCIALES
        // =========================
        await queryRunner.query(`
CREATE TABLE Credenciales (
    IdCredencial  INT IDENTITY(1,1) PRIMARY KEY,
    Usuario       VARCHAR(100) NOT NULL,
    Contrasena    VARCHAR(255) NOT NULL,
    IdUsuario     INT NOT NULL,
    Fec_Alta      DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta      VARCHAR(50),
    Fec_Modif     DATETIME2,
    Usr_Modif     VARCHAR(50),
    Fec_Baja      DATETIME2,
    Usr_Baja      VARCHAR(50)
);
        `);

        await queryRunner.query(`
ALTER TABLE Credenciales
    ADD CONSTRAINT fk_credenciales_usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario);
        `);

        await queryRunner.query(`
ALTER TABLE Credenciales
    ADD CONSTRAINT uq_credenciales_idusuario UNIQUE (IdUsuario);
        `);

        // =========================
        // INSERTS ESTADOS
        // =========================
        await queryRunner.query(`
INSERT INTO EstadoVisitas (Nombre, Descripcion, Color, Usr_Alta)
VALUES 
 ('Aprobado', 'La visita fue aprobada por el autorizante.', '#4CAF50', 'SYSTEM'),
 ('Rechazado', 'La visita fue rechazada por el autorizante.', '#F44336', 'SYSTEM'),
 ('Pendiente de Aprobación', 'La visita está esperando confirmación.', '#FFC107', 'SYSTEM'),
 ('Salida', 'La visita ya se retiró del edificio.', '#2196F3', 'SYSTEM');
        `);

        // =========================
        // INSERTS ROLES
        // =========================
        await queryRunner.query(`
INSERT INTO ROL (Nombre, Descripcion, Usr_Alta)
VALUES
 ('Visitante', 'Persona que ingresa como visita.', 'SYSTEM'),
 ('Recepcionista', 'Personal que gestiona el ingreso de visitas.', 'SYSTEM'),
 ('Autorizante', 'Usuario con facultad para autorizar visitas.', 'SYSTEM');
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM ROL`);
        await queryRunner.query(`DELETE FROM EstadoVisitas`);
        await queryRunner.query(`DROP TABLE Credenciales`);
    }
}

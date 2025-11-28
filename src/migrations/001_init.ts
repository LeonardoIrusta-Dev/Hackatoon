import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1700000000000 implements MigrationInterface {
    name = 'InitTables1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {


       await queryRunner.query(`DROP TABLE "Usuario"`);
        // =========================
        // TABLA: ROL
        // =========================
        await queryRunner.query(`
CREATE TABLE ROL (
    IdRol          INT IDENTITY(1,1) PRIMARY KEY,
    Nombre         VARCHAR(100) NOT NULL,
    Descripcion    VARCHAR(255),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: USUARIO
        // =========================
        await queryRunner.query(`
CREATE TABLE Usuario (
    IdUsuario      INT IDENTITY(1,1) PRIMARY KEY,
    DNI            VARCHAR(20) NOT NULL,
    Nombre         VARCHAR(150) NOT NULL,
    Telefono       VARCHAR(30),
    Mail           VARCHAR(150),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: USUARIO_ROL
        // =========================
        await queryRunner.query(`
CREATE TABLE Usuario_Rol (
    IdUsuario      INT NOT NULL,
    IdRol          INT NOT NULL,
    PRIMARY KEY (IdUsuario, IdRol),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: AREAS
        // =========================
        await queryRunner.query(`
CREATE TABLE Areas (
    IdArea         INT IDENTITY(1,1) PRIMARY KEY,
    Nombre         VARCHAR(150) NOT NULL,
    Descripcion    VARCHAR(255),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: FUNCION
        // =========================
        await queryRunner.query(`
CREATE TABLE Funcion (
    IdFuncion      INT IDENTITY(1,1) PRIMARY KEY,
    Nombre         VARCHAR(150) NOT NULL,
    Descripcion    VARCHAR(255),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: AUTORIZANTE
        // =========================
        await queryRunner.query(`
CREATE TABLE Autorizante (
    IdAutorizante  INT IDENTITY(1,1) PRIMARY KEY,
    IdArea         INT NOT NULL,
    IdUsuario      INT NOT NULL,
    IdFuncion      INT NOT NULL,
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: ESTADO_VISITAS
        // =========================
        await queryRunner.query(`
CREATE TABLE EstadoVisitas (
    IdEstado       INT IDENTITY(1,1) PRIMARY KEY,
    Nombre         VARCHAR(100) NOT NULL,
    Descripcion    VARCHAR(255),
    Color          VARCHAR(20),
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // TABLA: VISITAS
        // =========================
        await queryRunner.query(`
CREATE TABLE Visitas (
    IdVisita           INT IDENTITY(1,1) PRIMARY KEY,
    Hora               TIME,
    FechaIngreso       DATE,
    FechaIngresoReal   DATETIME2,
    FechaSalida        DATETIME2,
    IdAutorizante      INT,
    IdUsuario          INT NOT NULL,
    Motivo             VARCHAR(255),
    IdArea             INT,
    IdEstado           INT,
    Fec_Alta           DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta           VARCHAR(50),
    Fec_Modif          DATETIME2,
    Usr_Modif          VARCHAR(50),
    Fec_Baja           DATETIME2,
    Usr_Baja           VARCHAR(50)
);
        `);

        // =========================
        // TABLA: AUTORIZACIONES
        // =========================
        await queryRunner.query(`
CREATE TABLE Autorizaciones (
    IdAutorizacion INT IDENTITY(1,1) PRIMARY KEY,
    Fecha          DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    EsAutorizado   BIT NOT NULL DEFAULT 0,
    Fec_Alta       DATETIME2 DEFAULT SYSDATETIME(),
    Usr_Alta       VARCHAR(50),
    Fec_Modif      DATETIME2,
    Usr_Modif      VARCHAR(50),
    Fec_Baja       DATETIME2,
    Usr_Baja       VARCHAR(50)
);
        `);

        // =========================
        // FOREIGN KEYS
        // =========================
        await queryRunner.query(`
ALTER TABLE Usuario_Rol 
    ADD CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
        CONSTRAINT fk_usuario_rol_rol FOREIGN KEY (IdRol) REFERENCES ROL(IdRol);
        `);

        await queryRunner.query(`
ALTER TABLE Autorizante
    ADD CONSTRAINT fk_autorizante_area FOREIGN KEY (IdArea) REFERENCES Areas(IdArea),
        CONSTRAINT fk_autorizante_usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
        CONSTRAINT fk_autorizante_funcion FOREIGN KEY (IdFuncion) REFERENCES Funcion(IdFuncion);
        `);

        await queryRunner.query(`
ALTER TABLE Visitas
    ADD CONSTRAINT fk_visita_autorizante FOREIGN KEY (IdAutorizante) REFERENCES Autorizante(IdAutorizante),
        CONSTRAINT fk_visita_usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
        CONSTRAINT fk_visita_area FOREIGN KEY (IdArea) REFERENCES Areas(IdArea),
        CONSTRAINT fk_visita_estado FOREIGN KEY (IdEstado) REFERENCES EstadoVisitas(IdEstado);
        `);

        // =========================
        // ÍNDICES
        // =========================
        await queryRunner.query(`CREATE INDEX idx_visitas_usuario ON Visitas(IdUsuario)`);
        await queryRunner.query(`CREATE INDEX idx_visitas_estado ON Visitas(IdEstado)`);
        await queryRunner.query(`CREATE INDEX idx_visitas_area ON Visitas(IdArea)`);
        await queryRunner.query(`CREATE INDEX idx_autorizante_usuario ON Autorizante(IdUsuario)`);
        await queryRunner.query(`CREATE INDEX idx_usuario_rol_rol ON Usuario_Rol(IdRol)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE Autorizaciones`);
        await queryRunner.query(`DROP TABLE Visitas`);
        await queryRunner.query(`DROP TABLE EstadoVisitas`);
        await queryRunner.query(`DROP TABLE Autorizante`);
        await queryRunner.query(`DROP TABLE Funcion`);
        await queryRunner.query(`DROP TABLE Areas`);
        await queryRunner.query(`DROP TABLE Usuario_Rol`);
        await queryRunner.query(`DROP TABLE Usuario`);
        await queryRunner.query(`DROP TABLE ROL`);
    }
}

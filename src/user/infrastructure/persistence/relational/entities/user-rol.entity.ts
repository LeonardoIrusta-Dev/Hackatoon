import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { RolEntity } from '../../../../../rol/infrastructure/persistence/relational/entities/rol.entity';

@Entity({ name: 'Usuario_Rol' })
export class UsuarioRolEntity {
  @PrimaryColumn({ name: 'IdUsuario', type: 'int' })
  idUsuario: number;

  @PrimaryColumn({ name: 'IdRol', type: 'int' })
  idRol: number;

  @ManyToOne(() => UserEntity, (u) => u.usuariosRoles)
  @JoinColumn({ name: 'IdUsuario' })
  usuario: UserEntity;

  @ManyToOne(() => RolEntity, (r) => r.usuariosRoles)
  @JoinColumn({ name: 'IdRol' })
  rol: RolEntity;

  @Column({ name: 'Fec_Alta', type: 'datetime2', nullable: true })
  fechaAlta: Date;

  @Column({ name: 'Usr_Alta', nullable: true })
  usuarioAlta: string;
}

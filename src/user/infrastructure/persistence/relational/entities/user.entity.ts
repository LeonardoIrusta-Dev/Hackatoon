import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../../../../core/infrastructure/persistence/relational/entities/base.entity';
import { UsuarioRolEntity } from './user-rol.entity';
import { CredencialesEntity } from '../../../../../credentials/infrastructure/persistence/relational/entities/credential.entity';

@Entity({ name: 'Usuario' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'IdUsuario' })
  public id: number;

  @Column({ name: 'Nombre', nullable: true })
  public nombre: string;

  @Column({ name: 'Mail', nullable: true })
  public mail: string;

  @Column({ name: 'DNI', nullable: true })
  public dni: string;

  @Column({ name: 'Telefono', nullable: true })
  public telefono: string;

  @OneToMany(() => UsuarioRolEntity, (ur) => ur.usuario)
  usuariosRoles: UsuarioRolEntity[];

  @OneToOne(() => CredencialesEntity, (cred) => cred.user)
  public credenciales: CredencialesEntity;
}

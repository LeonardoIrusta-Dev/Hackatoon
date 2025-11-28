import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../../../../core/infrastructure/persistence/relational/entities/base.entity';
import { UserEntity } from '../../../../../user/infrastructure/persistence/relational/entities/user.entity';

@Entity({ name: 'Credenciales' })
export class CredencialesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'IdCredencial' })
  public id: number;

  @Column({ name: 'Usuario', nullable: true })
  public usuario: string;

  @Column({ name: 'Contrasena', nullable: true })
  public contrasena: string;

  @Column({ name: 'IdUsuario', nullable: false })
  public idUsuario: number;

  @OneToOne(() => UserEntity, (user) => user.credenciales)
  @JoinColumn({ name: 'IdUsuario' }) // FK en ESTA tabla
  public user: UserEntity;
}

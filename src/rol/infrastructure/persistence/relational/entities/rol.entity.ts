import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UsuarioRolEntity } from '../../../../../user/infrastructure/persistence/relational/entities/user-rol.entity';

@Entity({ name: 'Rol' })
export class RolEntity {
  @PrimaryGeneratedColumn({ name: 'IdRol' })
  id: number;

  @Column({ name: 'Nombre' })
  nombre: string;

  @Column({ name: 'Descripcion', nullable: true })
  descripcion: string;

  @OneToMany(() => UsuarioRolEntity, (ur) => ur.rol)
  usuariosRoles: UsuarioRolEntity[];
}

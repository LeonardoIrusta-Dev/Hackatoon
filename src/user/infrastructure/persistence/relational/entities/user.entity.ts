import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../../../core/infrastructure/persistence/relational/entities/base.entity';

@Entity({ name: 'Usuario' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  public id: number;

  @Column({ name: 'Nombre', nullable: true })
  public nombre: string;

  @Column({ name: 'Apellido', nullable: true })
  public apellido: string;

  @Column({ name: 'Email', nullable: true })
  public email: string;

  @Column({ name: 'NroDocumento', nullable: true })
  public nroDocumento: string;

  @Column({ name: 'Telefono', nullable: true })
  public telefono: string;
}

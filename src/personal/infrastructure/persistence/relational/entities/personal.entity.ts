import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../../../core/infrastructure/persistence/relational/entities/base.entity';

@Entity({ name: 'Personal' })
export class PersonalEntity extends BaseEntity {
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

  @Column({ name: 'Teleono', nullable: true })
  public telefono: string;

  @Column({ name: 'Activo', nullable: true })
  public activo: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../../../core/infrastructure/persistence/relational/entities/base.entity';

@Entity({ name: 'Visitas' })
export class VisitEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'IdVisita' })
  public id: number;

  // @Column({ name: 'Hora', type: 'time', nullable: true })
  // public hora?: string;

  @Column({ name: 'Hora', type: 'time', precision: 7, nullable: true })
  public hora?: string;

  @Column({ name: 'FechaIngreso', type: 'date', nullable: true })
  public fechaIngreso?: Date;

  @Column({
    name: 'FechaIngresoReal',
    type: 'datetime2',
    nullable: true,
  })
  public fechaIngresoReal?: Date;

  @Column({
    name: 'FechaSalida',
    type: 'datetime2',
    nullable: true,
  })
  public fechaSalida?: Date;

  @Column({ name: 'IdAutorizante', nullable: true })
  public idAutorizante?: number;

  @Column({ name: 'IdUsuario', nullable: false })
  public idUsuario: number;

  @Column({ name: 'Motivo', length: 255, nullable: true })
  public motivo?: string;

  @Column({ name: 'IdArea', nullable: true })
  public idArea?: number;

  @Column({ name: 'IdEstado', nullable: true })
  public idEstado?: number;
}

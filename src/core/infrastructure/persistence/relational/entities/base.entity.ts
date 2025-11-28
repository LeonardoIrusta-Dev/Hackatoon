import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'Fec_Alta' })
  Fec_Alta: Date;

  @Column({ name: 'Usr_Alta', nullable: true })
  Usr_Alta: number;

  @UpdateDateColumn({ name: 'Fec_Modif', nullable: true })
  Fec_Modif: Date;

  @Column({ name: 'Usr_Modif', nullable: true })
  Usr_Modif: number;

  @DeleteDateColumn({ name: 'Fec_Baja', nullable: true })
  Fec_Baja: Date;

  @Column({ name: 'Usr_Baja', nullable: true })
  Usr_Baja: number;
}

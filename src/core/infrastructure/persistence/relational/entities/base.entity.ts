import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'Fec_Alta' })
  createdAt: Date;

  @Column({ name: 'Usr_Alta', nullable: true })
  createdUserId: number;

  @UpdateDateColumn({ name: 'Fec_Modif', nullable: true })
  updatedAt: Date;

  @Column({ name: 'Usr_Modif', nullable: true })
  updatedUserId: number;

  @DeleteDateColumn({ name: 'Fec_Baja', nullable: true })
  deletedAt: Date;

  @Column({ name: 'Usr_Baja', nullable: true })
  deletedUserId: number;
}

import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @Column({ name: 'CreatedUserId', nullable: true })
  createdUserId: number;

  @UpdateDateColumn({ name: 'UpdatedAt', nullable: true })
  updatedAt: Date;

  @Column({ name: 'UpdatedUserId', nullable: true })
  updatedUserId: number;

  @DeleteDateColumn({ name: 'DeletedAt', nullable: true })
  deletedAt: Date;

  @Column({ name: 'DeletedUserId', nullable: true })
  deletedUserId: number;
}

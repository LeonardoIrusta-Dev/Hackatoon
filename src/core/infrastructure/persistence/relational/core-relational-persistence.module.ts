import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';
import { TransactionManager } from './database/transaction-maganer';

@Module({
  imports: [TypeOrmModule.forFeature([BaseEntity])],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class CoreEntityRelationalPersistenceModule {}

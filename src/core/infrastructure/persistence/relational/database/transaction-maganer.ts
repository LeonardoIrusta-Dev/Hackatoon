import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ITransactionManager } from '../../../../dto/interfaces/transaction-manager.interface';

@Injectable()
export class TransactionManager implements ITransactionManager {
  constructor(private readonly entityManager: EntityManager) {}

  async execute<T>(
    work: (transactionalEntityManager: any) => Promise<T>,
  ): Promise<T> {
    return this.entityManager.transaction(async (em) => {
      return work(em);
    });
  }
}

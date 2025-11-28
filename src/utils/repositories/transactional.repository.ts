import { EntityManager, ObjectType, Repository, ObjectLiteral } from 'typeorm';

export abstract class TransactionalRepository<
  T extends ObjectLiteral, // <- esto es clave
  TargetRepo,
> extends Repository<T> {
  protected constructor(
    private readonly entityClass: ObjectType<T>,
    private readonly repository: Repository<T>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  abstract transactional(entityManager: EntityManager): TargetRepo;

  protected fromEntityManager(
    entityManager: EntityManager,
    constr: (repository: Repository<T>) => TargetRepo,
  ): TargetRepo {
    return constr(entityManager.getRepository(this.entityClass));
  }
}

import { Injectable } from '@nestjs/common';
import { TransactionalRepository } from '../../../../../utils/repositories/transactional.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CredencialesEntity } from '../entities/credential.entity';
import { ICredentialRepository } from '../../../../domain/interfaces/credential.repository.interface';
import { UserCredencialesDTO } from '../../../../dto/credential.response.dto';
import { CredentialMapper } from '../mappers/credential.mapper';

@Injectable()
export class CredentialRepository
  extends TransactionalRepository<CredencialesEntity, CredentialRepository>
  implements ICredentialRepository
{
  constructor(
    @InjectRepository(CredencialesEntity)
    private readonly credentialRepository: Repository<CredencialesEntity>,
    private readonly entityManager: EntityManager,
  ) {
    super(CredencialesEntity, credentialRepository);
  }

  // 👇 Cambiamos el tipo del parámetro a "any"
  transactional(manager: any): CredentialRepository {
    if (!(manager instanceof EntityManager)) {
      throw new Error('Invalid transaction manager for TypeORM repository');
    }

    return this.fromEntityManager(
      manager,
      (repository) => new CredentialRepository(repository, manager),
    );
  }

  private getRepository(
    manager?: any,
  ): CredentialRepository | Repository<CredencialesEntity> {
    return manager ? this.transactional(manager) : this.credentialRepository;
  }

  async findCredentialByUserId(id: number): Promise<UserCredencialesDTO | null> {
    const find = await this.credentialRepository.findOne({
      where: { idUsuario: id },
    });

    if (!find) return null;
    return CredentialMapper.fromEntityToResponseDTO(find);
  }
}

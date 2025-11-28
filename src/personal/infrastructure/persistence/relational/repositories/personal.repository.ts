import { Injectable } from '@nestjs/common';
import { TransactionalRepository } from '../../../../../utils/repositories/transactional.repository';
import { PersonalEntity } from '../entities/personal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { PersonalUpdateDTO } from '../../../../dto/personal-update.dto';
import { PersonalMapper } from '../mappers/personal.mapper';
import { PersonalFindAllDTO } from '../../../../dto/personal-response.dto';
import { IPersonalRepository } from '../../../../domain/interfaces/personal.repository.interface';
import { PersonalSaveDTO } from '../../../../dto/personal-save.dto';

@Injectable()
export class PersonalRepository
  extends TransactionalRepository<PersonalEntity, PersonalRepository>
  implements IPersonalRepository
{
  constructor(
    @InjectRepository(PersonalEntity)
    private readonly personalRepository: Repository<PersonalEntity>,
    private readonly entityManager: EntityManager,
  ) {
    super(PersonalEntity, personalRepository);
  }

  // 👇 Cambiamos el tipo del parámetro a "any"
  transactional(manager: any): PersonalRepository {
    if (!(manager instanceof EntityManager)) {
      throw new Error('Invalid transaction manager for TypeORM repository');
    }

    return this.fromEntityManager(
      manager,
      (repository) => new PersonalRepository(repository, manager),
    );
  }

  private getRepository(
    manager?: any,
  ): PersonalRepository | Repository<PersonalEntity> {
    return manager ? this.transactional(manager) : this.personalRepository;
  }

  async findAllPersonals(): Promise<PersonalFindAllDTO[]> {
    const find = await this.personalRepository.find();
    return find.map((personal) =>
      PersonalMapper.fromEntityToResponseDTO(personal),
    );
  }

  async findByPersonalId(id: number): Promise<PersonalFindAllDTO | null> {
    const find = await this.personalRepository.findOne({ where: { id } });
    if (!find) return null;
    return PersonalMapper.fromEntityToResponseDTO(find);
  }

  async savePersonal(
    saveDTO: PersonalSaveDTO,
    manager?: any,
  ): Promise<PersonalFindAllDTO> {
    const repo = this.getRepository(manager);
    const save = await repo.save(PersonalMapper.frontSaveDTOtoEntity(saveDTO));
    return PersonalMapper.fromEntityToResponseDTO(save);
  }

  async updatePersonal(
    updateDto: PersonalUpdateDTO,
    existsPersonal: PersonalEntity,
    manager?: any,
  ): Promise<PersonalFindAllDTO> {
    const repo = this.getRepository(manager);
    const update = await repo.save(
      PersonalMapper.frontUpdateDTOtoEntity(updateDto, existsPersonal),
    );
    return PersonalMapper.fromEntityToResponseDTO(update);
  }

  async desactivarPersonal(personalId: number): Promise<number> {
    const result = await this.personalRepository
      .createQueryBuilder()
      .update()
      .set({ activo: false })
      .where('id = :personalId', { personalId })
      .execute();

    return result.affected ?? 0;
  }
}

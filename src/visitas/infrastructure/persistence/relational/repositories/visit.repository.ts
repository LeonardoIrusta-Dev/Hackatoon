import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TransactionalRepository } from '../../../../../utils/repositories/transactional.repository';
import { VisitEntity } from '../entities/visit.entity';
import { VisitUpdateDTO } from '../../../../dto/visit-update.dto';
import { VisitMapper } from '../mappers/visit.mapper';
import { VisitFindAllDTO } from '../../../../dto/visit-response.dto';
import { IVisitRepository } from '../../../../domain/interfaces/visit.repository.interface';
import { VisitSaveDTO } from '../../../../dto/visit-save.dto';

@Injectable()
export class VisitRepository
  extends TransactionalRepository<VisitEntity, VisitRepository>
  implements IVisitRepository
{
  constructor(
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
    private readonly entityManager: EntityManager,
  ) {
    super(VisitEntity, visitRepository);
  }

  transactional(manager: any): VisitRepository {
    if (!(manager instanceof EntityManager)) {
      throw new Error('Invalid transaction manager for TypeORM repository');
    }

    return this.fromEntityManager(
      manager,
      (repository) => new VisitRepository(repository, manager),
    );
  }

  private getRepository(
    manager?: any,
  ): VisitRepository | Repository<VisitEntity> {
    return manager ? this.transactional(manager) : this.visitRepository;
  }

  async findAllVisits(): Promise<VisitFindAllDTO[]> {
    const find = await this.visitRepository.find();
    return find.map((v) => VisitMapper.fromEntityToResponseDTO(v));
  }

  async findByVisitId(id: number): Promise<VisitFindAllDTO | null> {
    const find = await this.visitRepository.findOne({ where: { id } });
    if (!find) return null;
    return VisitMapper.fromEntityToResponseDTO(find);
  }

  async saveVisit(
    saveDTO: VisitSaveDTO,
    manager?: any,
  ): Promise<VisitFindAllDTO> {
    const repo = this.getRepository(manager);
    const save = await repo.save(VisitMapper.frontSaveDTOtoEntity(saveDTO));
    return VisitMapper.fromEntityToResponseDTO(save);
  }

  async updateVisit(
    updateDto: VisitUpdateDTO,
    existsVisit: VisitEntity,
    manager?: any,
  ): Promise<VisitFindAllDTO> {
    const repo = this.getRepository(manager);
    const update = await repo.save(
      VisitMapper.frontUpdateDTOtoEntity(updateDto, existsVisit),
    );
    return VisitMapper.fromEntityToResponseDTO(update);
  }

  async desactivarVisit(visitId: number): Promise<number> {
    const result = await this.visitRepository
      .createQueryBuilder()
      .update()
      .set({ Fec_Baja: new Date() })
      .where('id = :visitId', { visitId })
      .execute();

    return result.affected ?? 0;
  }
}

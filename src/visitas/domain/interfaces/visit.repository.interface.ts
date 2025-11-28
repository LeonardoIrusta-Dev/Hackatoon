import { EntityManager } from 'typeorm';
import { VisitFindAllDTO } from '../../dto/visit-response.dto';
import { VisitSaveDTO } from '../../dto/visit-save.dto';
import { VisitUpdateDTO } from '../../dto/visit-update.dto';
import { VisitEntity } from '../../infrastructure/persistence/relational/entities/visit.entity';

export interface IVisitRepository {
  findAllVisits(): Promise<VisitFindAllDTO[]>;
  findByVisitId(id: number): Promise<VisitFindAllDTO | null>;
  saveVisit(
    visit: VisitSaveDTO,
    entityManager?: EntityManager,
  ): Promise<VisitFindAllDTO>;
  updateVisit(
    updateDto: VisitUpdateDTO,
    existsVisit: VisitEntity,
    entityManager?: EntityManager,
  ): Promise<VisitFindAllDTO>;
  desactivarVisit(visitId: number): Promise<number>;
}

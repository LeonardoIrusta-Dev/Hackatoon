import { VisitFindAllDTO } from '../../dto/visit-response.dto';
import { VisitSaveDTO } from '../../dto/visit-save.dto';
import { VisitUpdateDTO } from '../../dto/visit-update.dto';

export interface IVisitService {
  findAllVisits(): Promise<VisitFindAllDTO[]>;
  findByVisitId(id: number): Promise<VisitFindAllDTO | null>;
  saveVisit(saveDTO: VisitSaveDTO): Promise<VisitFindAllDTO>;
  updateVisit(
    visitId: number,
    updateDto: VisitUpdateDTO,
  ): Promise<VisitFindAllDTO | null>;
  desactivateVisit(visitId: number): Promise<{ message: string }>;
}

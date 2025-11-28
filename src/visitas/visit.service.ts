import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VisitRepository } from './infrastructure/persistence/relational/repositories/visit.repository';
import { VisitFindAllDTO } from './dto/visit-response.dto';
import { VisitSaveDTO } from './dto/visit-save.dto';
import { VisitUpdateDTO } from './dto/visit-update.dto';
import { IVisitService } from './domain/interfaces/visit.service.interface';
import { TransactionManager } from '../core/infrastructure/persistence/relational/database/transaction-maganer';

@Injectable()
export class VisitService implements IVisitService {
  constructor(
    private readonly visitRepository: VisitRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  public async findAllVisits(): Promise<VisitFindAllDTO[]> {
    return this.visitRepository.findAllVisits();
  }

  public async findByVisitId(
    id: number,
  ): Promise<VisitFindAllDTO | null> {
    return this.visitRepository.findByVisitId(id);
  }

  public async saveVisit(
    saveDTO: VisitSaveDTO,
  ): Promise<VisitFindAllDTO> {
    try {
      return await this.transactionManager.execute(async (em) => {
        // Podés hacer validaciones extra acá (por ejemplo, verificar que exista el usuario)
        return this.visitRepository.saveVisit(saveDTO, em);
      });
    } catch (error) {
      if ((error as any).getStatus) throw error;

      throw new BadRequestException('No se pudo guardar la visita');
    }
  }

  public async updateVisit(
    visitId: number,
    updateDto: VisitUpdateDTO,
  ): Promise<VisitFindAllDTO | null> {
    try {
      return await this.transactionManager.execute(async (em) => {
        const existsVisit = await this.visitRepository.findOne({
          where: { id: visitId },
        });

        if (!existsVisit) {
          throw new NotFoundException(
            `La visita con id ${visitId} no fue encontrada`,
          );
        }

        return this.visitRepository.updateVisit(updateDto, existsVisit, em);
      });
    } catch (error) {
      if ((error as any).getStatus) throw error;

      throw new BadRequestException('No se pudo actualizar la visita');
    }
  }

  public async desactivateVisit(
    visitId: number,
  ): Promise<{ message: string }> {
    try {
      const affectedRows = await this.visitRepository.desactivarVisit(visitId);

      if (affectedRows === 0) {
        throw new BadRequestException(
          'El registro no se puede desactivar porque está activo o no existe.',
        );
      }

      return { message: 'La visita ha sido desactivada correctamente.' };
    } catch (error) {
      if ((error as any).getStatus) throw error;

      throw new InternalServerErrorException(
        'No se pudo desactivar la visita',
      );
    }
  }
}

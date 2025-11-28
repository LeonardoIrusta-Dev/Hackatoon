import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonalRepository } from './infrastructure/persistence/relational/repositories/personal.repository';
import { PersonalFindAllDTO } from './dto/personal-response.dto';
import { PersonalSaveDTO } from './dto/personal-save.dto';
import { PersonalUpdateDTO } from './dto/personal-update.dto';
import { IPersonalService } from './domain/interfaces/personal.service.interface';
import { TransactionManager } from '../core/infrastructure/persistence/relational/database/transaction-maganer';

@Injectable()
export class PersonalService implements IPersonalService {
  constructor(
    private readonly personalRepository: PersonalRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  public async findAllPersonals() {
    return this.personalRepository.findAllPersonals();
  }

  public async findByPersonalId(
    id: number,
  ): Promise<PersonalFindAllDTO | null> {
    return this.personalRepository.findByPersonalId(id);
  }

  public async savePersonal(
    saveDTO: PersonalSaveDTO,
  ): Promise<PersonalFindAllDTO> {
    try {
      return await this.transactionManager.execute(async (em) => {
        const personal = this.personalRepository.create(saveDTO);

        return this.personalRepository.savePersonal(personal, em);
      });
    } catch (error) {
      if (error.getStatus) throw error;

      throw new BadRequestException('No se pudo guardar el personal');
    }
  }

  public async updatePersonal(
    personalId: number,
    updateDto: PersonalUpdateDTO,
  ): Promise<PersonalFindAllDTO | null> {
    try {
      return await this.transactionManager.execute(async (em) => {
        // 🔹 cambio acá
        const existsPersonal = await this.personalRepository.findOne({
          where: { id: personalId },
        });

        if (!existsPersonal) {
          throw new NotFoundException(
            `El personal con id ${personalId} no fue encontrado`,
          );
        }

        return this.personalRepository.updatePersonal(
          updateDto,
          existsPersonal,
          em,
        );
      });
    } catch (error) {
      if (error.getStatus) throw error;

      throw new BadRequestException('No se pudo actualizar el personal');
    }
  }

  public async desactivatePersonal(
    personalId: number,
  ): Promise<{ message: string }> {
    try {
      const affectedRows =
        await this.personalRepository.desactivarPersonal(personalId);

      if (affectedRows === 0) {
        throw new BadRequestException(
          'El registro no se puede desactivar porque está activo o no existe.',
        );
      }

      return { message: 'El personal ha sido desactivado correctamente.' };
    } catch (error) {
      if (error.getStatus) throw error;

      throw new InternalServerErrorException(
        'No se pudo desactivar el personal',
      );
    }
  }
}

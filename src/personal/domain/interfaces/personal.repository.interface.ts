import { EntityManager } from 'typeorm';
import { PersonalFindAllDTO } from '../../dto/personal-response.dto';
import { PersonalEntity } from '../../infrastructure/persistence/relational/entities/personal.entity';
import { PersonalUpdateDTO } from '../../dto/personal-update.dto';
import { PersonalSaveDTO } from '../../dto/personal-save.dto';

export interface IPersonalRepository {
  findAllPersonals(): Promise<PersonalFindAllDTO[]>;
  findByPersonalId(id: number): Promise<PersonalFindAllDTO | null>;
  savePersonal(
    personal: PersonalSaveDTO,
    entityManager?: EntityManager,
  ): Promise<PersonalFindAllDTO>;
  updatePersonal(
    updateDto: PersonalUpdateDTO,
    existsPersonal: PersonalEntity,
    entityManager?: EntityManager,
  ): Promise<PersonalFindAllDTO>;
  desactivarPersonal(personalId: number): Promise<number>;
}

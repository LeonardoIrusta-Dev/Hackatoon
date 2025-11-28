import { PersonalFindAllDTO } from '../../dto/personal-response.dto';
import { PersonalSaveDTO } from '../../dto/personal-save.dto';
import { PersonalUpdateDTO } from '../../dto/personal-update.dto';

export interface IPersonalService {
  findAllPersonals(): Promise<PersonalFindAllDTO[]>;
  findByPersonalId(id: number): Promise<PersonalFindAllDTO | null>;
  savePersonal(saveDTO: PersonalSaveDTO): Promise<PersonalFindAllDTO>;
  updatePersonal(
    personalId: number,
    updateDto: PersonalUpdateDTO,
  ): Promise<PersonalFindAllDTO | null>;
  desactivatePersonal(personalId: number): Promise<{ message: string }>;
}

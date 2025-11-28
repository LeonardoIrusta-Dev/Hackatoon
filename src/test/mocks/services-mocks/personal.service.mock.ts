import { IPersonalService } from '../../../personal/domain/interfaces/personal.service.interface';

export const mockPersonalService: Partial<jest.Mocked<IPersonalService>> = {
  findAllPersonals: jest.fn(),
  findByPersonalId: jest.fn(),
  savePersonal: jest.fn(),
  updatePersonal: jest.fn(),
  desactivatePersonal: jest.fn(),
};

import { IUserService } from '../../../user/domain/interfaces/user.service.interface';

export const mockUserService: Partial<jest.Mocked<IUserService>> = {
  findAllUsers: jest.fn(),
  findByUserId: jest.fn(),
  saveUser: jest.fn(),
  updateUser: jest.fn(),
  desactivateUser: jest.fn(),
};

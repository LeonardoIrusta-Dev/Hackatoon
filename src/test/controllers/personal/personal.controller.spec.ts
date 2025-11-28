import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserController } from '../../../user/user.controller';
import { IUserService } from '../../../user/domain/interfaces/user.service.interface';
import { createControllerTestingModule } from '../../utils/create-testing-controller-module';
import { UserService } from '../../../user/user.service';
import { mockUserService } from '../../mocks/services-mocks/user.service.mock';
import { userMockResult } from '../../mocks/user/personal.mock.result';
import {
  userMockSave,
  userMockUpdate,
} from '../../mocks/user/personal.mock.send';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<IUserService>;

  beforeEach(async () => {
    const { controller: c } = await createControllerTestingModule(
      UserController,
      [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    );
    controller = c;

    service = mockUserService as jest.Mocked<IUserService>;

    jest.clearAllMocks();
  });

  describe('findAllUsers', () => {
    it('should return User', async () => {
      service.findAllUsers.mockResolvedValue([userMockResult]);

      const result = await controller.findAllUsers();

      expect(result).toEqual([userMockResult]);
      expect(service.findAllUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByUserId', () => {
    it('should return user by Id', async () => {
      service.findByUserId.mockResolvedValue(userMockResult);

      const result = await controller.findByUserId('1');

      expect(result).toEqual(userMockResult);
      expect(service.findByUserId).toHaveBeenCalledTimes(1);
    });
  });

  describe('saveUser', () => {
    it('should create a new User', async () => {
      service.saveUser.mockResolvedValue(userMockResult);

      const result = await controller.save(userMockSave);

      expect(service.saveUser).toHaveBeenCalledWith(userMockSave);
      expect(result).toEqual(userMockResult);
    });

    it('should throw if service throws BadRequestException', async () => {
      const error = new BadRequestException('No se pudo guardar el personal');
      service.saveUser.mockRejectedValue(error);

      await expect(controller.save(userMockSave)).rejects.toThrow(
        BadRequestException,
      );

      expect(service.saveUser).toHaveBeenCalledWith(userMockSave);
    });
  });

  describe('UpdateUser', () => {
    it('should update a User', async () => {
      service.updateUser.mockResolvedValue(userMockResult);

      const result = await controller.update(userMockUpdate, '1');

      expect(service.updateUser).toHaveBeenCalledWith(1, userMockUpdate);
      expect(result).toEqual(userMockResult);
    });

    it('should throw NotFoundException if user not found', async () => {
      service.updateUser.mockRejectedValue(
        new NotFoundException('El user con id 1 no fue encontrado'),
      );

      await expect(controller.update(userMockUpdate, '1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if unknown error occurs', async () => {
      service.updateUser.mockRejectedValue(
        new BadRequestException('No se pudo actualizar el user'),
      );

      await expect(controller.update(userMockUpdate, '1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('desactivateUser', () => {
    it('should desactivate a User', async () => {
      service.desactivateUser.mockResolvedValue({
        message: 'El usuario ha sido desactivado correctamente.',
      });

      const result = await controller.desactivePersonal('1');

      expect(service.desactivateUser).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: 'El usuario ha sido desactivado correctamente.',
      });
    });

    it('should throw BadRequestException if personal cannot be desactivated', async () => {
      service.desactivateUser.mockRejectedValue(
        new BadRequestException(
          'El registro no se puede desactivar porque está activo o no existe.',
        ),
      );

      await expect(controller.desactivePersonal('1')).rejects.toThrow(
        BadRequestException,
      );

      expect(service.desactivateUser).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException on unknown error', async () => {
      service.desactivateUser.mockRejectedValue(
        new InternalServerErrorException('Error interno del servidor'),
      );

      await expect(controller.desactivePersonal('1')).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(service.desactivateUser).toHaveBeenCalledWith(1);
    });
  });
});

import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPersonalService } from '../../../personal/domain/interfaces/personal.service.interface';
import { PersonalController } from '../../../personal/personal.controller';
import { PersonalService } from '../../../personal/personal.service';
import { personalMockResult } from '../../mocks/personal/personal.mock.result';
import {
  personalMockSave,
  personalMockUpdate,
} from '../../mocks/personal/personal.mock.send';
import { mockPersonalService } from '../../mocks/services-mocks/personal.service.mock';
import { createControllerTestingModule } from '../../utils/create-testing-controller-module';

describe('PersonalController', () => {
  let controller: PersonalController;
  let service: jest.Mocked<IPersonalService>;

  beforeEach(async () => {
    const { controller: c } = await createControllerTestingModule(
      PersonalController,
      [
        {
          provide: PersonalService,
          useValue: mockPersonalService,
        },
      ],
    );
    controller = c;

    service = mockPersonalService as jest.Mocked<IPersonalService>;

    jest.clearAllMocks();
  });

  describe('findAllPersonals', () => {
    it('should return personals', async () => {
      service.findAllPersonals.mockResolvedValue([personalMockResult]);

      const result = await controller.findAllPersonals();

      expect(result).toEqual([personalMockResult]);
      expect(service.findAllPersonals).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByPersonalId', () => {
    it('should return personal by Id', async () => {
      service.findByPersonalId.mockResolvedValue(personalMockResult);

      const result = await controller.findPersonalById('1');

      expect(result).toEqual(personalMockResult);
      expect(service.findByPersonalId).toHaveBeenCalledTimes(1);
    });
  });

  describe('savePersonal', () => {
    it('should create a new Personal', async () => {
      service.savePersonal.mockResolvedValue(personalMockResult);

      const result = await controller.save(personalMockSave);

      expect(service.savePersonal).toHaveBeenCalledWith(personalMockSave);
      expect(result).toEqual(personalMockResult);
    });

    it('should throw if service throws BadRequestException', async () => {
      const error = new BadRequestException('No se pudo guardar el personal');
      service.savePersonal.mockRejectedValue(error);

      await expect(controller.save(personalMockSave)).rejects.toThrow(
        BadRequestException,
      );

      expect(service.savePersonal).toHaveBeenCalledWith(personalMockSave);
    });
  });

  describe('UpdatePersonal', () => {
    it('should update a Personal', async () => {
      service.updatePersonal.mockResolvedValue(personalMockResult);

      const result = await controller.update(personalMockUpdate, '1');

      expect(service.updatePersonal).toHaveBeenCalledWith(
        1,
        personalMockUpdate,
      );
      expect(result).toEqual(personalMockResult);
    });

    it('should throw NotFoundException if personal not found', async () => {
      service.updatePersonal.mockRejectedValue(
        new NotFoundException('El personal con id 1 no fue encontrado'),
      );

      await expect(controller.update(personalMockUpdate, '1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if unknown error occurs', async () => {
      service.updatePersonal.mockRejectedValue(
        new BadRequestException('No se pudo actualizar el personal'),
      );

      await expect(controller.update(personalMockUpdate, '1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('desactivatePersonal', () => {
    it('should desactivate a Personal', async () => {
      service.desactivatePersonal.mockResolvedValue({
        message: 'El personal ha sido desactivado correctamente.',
      });

      const result = await controller.desactivePersonal('1');

      expect(service.desactivatePersonal).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: 'El personal ha sido desactivado correctamente.',
      });
    });

    it('should throw BadRequestException if personal cannot be desactivated', async () => {
      service.desactivatePersonal.mockRejectedValue(
        new BadRequestException(
          'El registro no se puede desactivar porque está activo o no existe.',
        ),
      );

      await expect(controller.desactivePersonal('1')).rejects.toThrow(
        BadRequestException,
      );

      expect(service.desactivatePersonal).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException on unknown error', async () => {
      service.desactivatePersonal.mockRejectedValue(
        new InternalServerErrorException('Error interno del servidor'),
      );

      await expect(controller.desactivePersonal('1')).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(service.desactivatePersonal).toHaveBeenCalledWith(1);
    });
  });
});

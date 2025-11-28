import { UserSaveDTO } from '../../../user/dto/user-save.dto';
import { UserUpdateDTO } from '../../../user/dto/user-update.dto';

export const userMockSave: UserSaveDTO = {
  nombre: 'John',

  dni: '12345678',
  mail: 'exmaple@gmail.com',
  telefono: '1234567890',
};

export const userMockUpdate: UserUpdateDTO = {
  dni: '12345678',
};

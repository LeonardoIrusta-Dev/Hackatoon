import { UserSaveDTO } from '../../../user/dto/user-save.dto';
import { UserUpdateDTO } from '../../../user/dto/user-update.dto';

export const userMockSave: UserSaveDTO = {
  nombre: 'John',
  apellido: 'Doe',
  nroDocumento: '12345678',
  email: 'exmaple@gmail.com',
  telefono: '1234567890',
};

export const userMockUpdate: UserUpdateDTO = {
  apellido: 'Doe',
  nroDocumento: '12345678',
};

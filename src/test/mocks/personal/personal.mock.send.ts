import { PersonalSaveDTO } from '../../../personal/dto/personal-save.dto';
import { PersonalUpdateDTO } from '../../../personal/dto/personal-update.dto';

export const personalMockSave: PersonalSaveDTO = {
  nombre: 'John',
  apellido: 'Doe',
  nroDocumento: '12345678',
  email: 'exmaple@gmail.com',
  telefono: '1234567890',
};

export const personalMockUpdate: PersonalUpdateDTO = {
  apellido: 'Doe',
  nroDocumento: '12345678',
};

import { UserFindAllDTO } from '../../../user/dto/user-response.dto';

export const userMockResult: UserFindAllDTO = {
  id: 1,
  nombre: 'John',
  apellido: 'Doe',
  nroDocumento: '12345678',
  email: 'exmaple@gmail.com',
  telefono: '1234567890',
  activo: true,
};

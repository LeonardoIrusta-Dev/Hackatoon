import { UserCredencialesDTO } from '../../dto/credential.response.dto';

export interface ICredentialService {
  findCredentialByUserId(id: number): Promise<UserCredencialesDTO | null>;
}

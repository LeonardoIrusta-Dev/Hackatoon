import { UserCredencialesDTO } from "../../dto/credential.response.dto";

export interface ICredentialRepository {
  findCredentialByUserId(id: number): Promise<UserCredencialesDTO | null>;
}

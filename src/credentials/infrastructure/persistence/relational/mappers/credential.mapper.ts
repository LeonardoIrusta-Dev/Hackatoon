import { UserCredencialesDTO } from '../../../../dto/credential.response.dto';
import { CredencialesEntity } from '../entities/credential.entity';

export class CredentialMapper {
  static fromEntityToResponseDTO(
    entity: CredencialesEntity,
  ): UserCredencialesDTO {
    const credentialFindAllDTO = new UserCredencialesDTO();

    credentialFindAllDTO.idUsuario = entity.idUsuario;
    credentialFindAllDTO.usuario = entity.usuario;
    credentialFindAllDTO.contrasena = entity.contrasena;

    return credentialFindAllDTO;
  }
}

import { UserFindAllDTO } from '../../../../dto/user-response.dto';
import { UserSaveDTO } from '../../../../dto/user-save.dto';
import { UserUpdateDTO } from '../../../../dto/user-update.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static frontSaveDTOtoEntity(userSaveDTO: UserSaveDTO): UserEntity {
    const userEntity = new UserEntity();

    userEntity.nombre = userSaveDTO.nombre;
    userEntity.apellido = userSaveDTO.apellido;
    userEntity.email = userSaveDTO.email;
    userEntity.nroDocumento = userSaveDTO.nroDocumento;
    userEntity.telefono = userSaveDTO.telefono;

    return userEntity;
  }

  static fromEntityToResponseDTO(entity: UserEntity): UserFindAllDTO {
    const userFindAllDTO = new UserFindAllDTO();

    userFindAllDTO.id = entity.id;
    userFindAllDTO.nombre = entity.nombre;
    userFindAllDTO.apellido = entity.apellido;
    userFindAllDTO.email = entity.email;
    userFindAllDTO.nroDocumento = entity.nroDocumento;
    userFindAllDTO.telefono = entity.telefono;

    return userFindAllDTO;
  }

  static frontUpdateDTOtoEntity(
    userUpdateDTO: UserUpdateDTO,
    existingEntity: UserEntity,
  ): UserEntity {
    Object.assign(existingEntity, userUpdateDTO);

    return existingEntity;
  }
}

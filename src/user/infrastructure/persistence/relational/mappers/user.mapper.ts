import { UserFindAllDTO } from '../../../../dto/user-response.dto';
import { UserSaveDTO } from '../../../../dto/user-save.dto';
import { UserUpdateDTO } from '../../../../dto/user-update.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static frontSaveDTOtoEntity(userSaveDTO: UserSaveDTO): UserEntity {
    const userEntity = new UserEntity();

    userEntity.nombre = userSaveDTO.nombre;
    userEntity.mail = userSaveDTO.mail;
    userEntity.dni = userSaveDTO.dni;
    userEntity.telefono = userSaveDTO.telefono;

    return userEntity;
  }

  static fromEntityToResponseDTO(entity: UserEntity): UserFindAllDTO {
    const userFindAllDTO = new UserFindAllDTO();

    userFindAllDTO.id = entity.id;
    userFindAllDTO.nombre = entity.nombre;
    userFindAllDTO.mail = entity.mail;
    userFindAllDTO.dni = entity.dni;
    userFindAllDTO.telefono = entity.telefono;

    userFindAllDTO.roles =
      entity.usuariosRoles?.map((ur) => ({
        id: ur.rol.id,
        nombre: ur.rol.nombre,
        descripcion: ur.rol.descripcion,
      })) ?? [];

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

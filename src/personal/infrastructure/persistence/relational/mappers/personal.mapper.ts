import { PersonalFindAllDTO } from '../../../../dto/personal-response.dto';
import { PersonalSaveDTO } from '../../../../dto/personal-save.dto';
import { PersonalUpdateDTO } from '../../../../dto/personal-update.dto';
import { PersonalEntity } from '../entities/personal.entity';

export class PersonalMapper {
  static frontSaveDTOtoEntity(
    personalSaveDTO: PersonalSaveDTO,
  ): PersonalEntity {
    const personalEntity = new PersonalEntity();

    personalEntity.nombre = personalSaveDTO.nombre;
    personalEntity.apellido = personalSaveDTO.apellido;
    personalEntity.email = personalSaveDTO.email;
    personalEntity.nroDocumento = personalSaveDTO.nroDocumento;
    personalEntity.telefono = personalSaveDTO.telefono;
    personalEntity.activo = true;

    return personalEntity;
  }

  static fromEntityToResponseDTO(entity: PersonalEntity): PersonalFindAllDTO {
    const personalFindAllDTO = new PersonalFindAllDTO();

    personalFindAllDTO.id = entity.id;
    personalFindAllDTO.nombre = entity.nombre;
    personalFindAllDTO.apellido = entity.apellido;
    personalFindAllDTO.email = entity.email;
    personalFindAllDTO.nroDocumento = entity.nroDocumento;
    personalFindAllDTO.telefono = entity.telefono;
    personalFindAllDTO.activo = entity.activo;

    return personalFindAllDTO;
  }

  static frontUpdateDTOtoEntity(
    personalUpdateDTO: PersonalUpdateDTO,
    existingEntity: PersonalEntity,
  ): PersonalEntity {
    Object.assign(existingEntity, personalUpdateDTO);

    return existingEntity;
  }
}

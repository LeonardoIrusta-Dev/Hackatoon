import { VisitFindAllDTO } from '../../../../dto/visit-response.dto';
import { VisitSaveDTO } from '../../../../dto/visit-save.dto';
import { VisitUpdateDTO } from '../../../../dto/visit-update.dto';
import { VisitEntity } from '../entities/visit.entity';

export class VisitMapper {
  static frontSaveDTOtoEntity(visitSaveDTO: VisitSaveDTO): VisitEntity {
    const visitEntity = new VisitEntity();

    visitEntity.idUsuario = visitSaveDTO.idUsuario;
    visitEntity.idAutorizante = visitSaveDTO.idAutorizante;
    visitEntity.idArea = visitSaveDTO.idArea;
    visitEntity.idEstado = visitSaveDTO.idEstado;
    visitEntity.motivo = visitSaveDTO.motivo;
    visitEntity.hora = visitSaveDTO.hora;
    visitEntity.fechaIngreso = visitSaveDTO.fechaIngreso;

    return visitEntity;
  }

  static fromEntityToResponseDTO(entity: VisitEntity): VisitFindAllDTO {
    const dto = new VisitFindAllDTO();

    dto.id = entity.id;
    dto.hora = entity.hora;
    dto.fechaIngreso = entity.fechaIngreso;
    dto.fechaIngresoReal = entity.fechaIngresoReal;
    dto.fechaSalida = entity.fechaSalida;
    dto.idUsuario = entity.idUsuario;
    dto.idAutorizante = entity.idAutorizante;
    dto.idArea = entity.idArea;
    dto.idEstado = entity.idEstado;
    dto.motivo = entity.motivo;

    return dto;
  }

  static frontUpdateDTOtoEntity(
    visitUpdateDTO: VisitUpdateDTO,
    existingEntity: VisitEntity,
  ): VisitEntity {
    Object.assign(existingEntity, visitUpdateDTO);
    return existingEntity;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VisitFindAllDTO {
  @ApiProperty()
  @Expose()
  public id: number;

  @ApiProperty({ required: false, description: 'Hora planificada de la visita' })
  @Expose()
  public hora?: string;

  @ApiProperty({ required: false })
  @Expose()
  public fechaIngreso?: Date;

  @ApiProperty({ required: false })
  @Expose()
  public fechaIngresoReal?: Date;

  @ApiProperty({ required: false })
  @Expose()
  public fechaSalida?: Date;

  @ApiProperty()
  @Expose()
  public idUsuario: number;

  @ApiProperty({ required: false })
  @Expose()
  public idAutorizante?: number;

  @ApiProperty({ required: false })
  @Expose()
  public idArea?: number;

  @ApiProperty({ required: false })
  @Expose()
  public idEstado?: number;

  @ApiProperty({ required: false })
  @Expose()
  public motivo?: string;
}

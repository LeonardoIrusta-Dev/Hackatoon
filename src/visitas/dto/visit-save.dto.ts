import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { NAME_NUMBER_REGEX } from '../../utils/constants/constants';

export class VisitSaveDTO {
  @ApiProperty({
    description: 'Id del usuario que ingresa como visita (FK Usuario)',
  })
  @IsNotEmpty({ message: 'El IdUsuario es obligatorio.' })
  @IsInt({ message: 'El IdUsuario debe ser numérico.' })
  public idUsuario: number;

  @ApiPropertyOptional({
    description: 'Id del autorizante (FK Autorizante). Opcional',
  })
  @IsOptional()
  @IsInt({ message: 'El IdAutorizante debe ser numérico.' })
  public idAutorizante?: number;

  @ApiPropertyOptional({
    description: 'Id del área a la que se dirige la visita',
  })
  @IsOptional()
  @IsInt({ message: 'El IdArea debe ser numérico.' })
  public idArea?: number;

  @ApiPropertyOptional({
    description: 'Id del estado de la visita (FK EstadoVisitas)',
  })
  @IsOptional()
  @IsInt({ message: 'El IdEstado debe ser numérico.' })
  public idEstado?: number;

  @ApiPropertyOptional({
    description: 'Motivo de la visita',
    maxLength: 255,
  })
  @IsOptional()
  @MaxLength(255, { message: 'El Motivo excede los 255 caracteres.' })
  public motivo?: string;

  @ApiPropertyOptional({
    description: 'Hora planificada (HH:mm:ss). Si no se envía, puede calcularse en backend.',
  })
  @IsOptional()
  public hora?: string;
  

  @ApiPropertyOptional({
    description: 'Fecha de ingreso (YYYY-MM-DD).',
  })
  @IsOptional()
  public fechaIngreso?: Date;
}

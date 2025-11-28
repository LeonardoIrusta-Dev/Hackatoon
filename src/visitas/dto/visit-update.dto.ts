import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, MaxLength } from 'class-validator';

export class VisitUpdateDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El IdUsuario debe ser numérico.' })
  public idUsuario?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El IdAutorizante debe ser numérico.' })
  public idAutorizante?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El IdArea debe ser numérico.' })
  public idArea?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El IdEstado debe ser numérico.' })
  public idEstado?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(255, { message: 'El Motivo excede los 255 caracteres.' })
  public motivo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public hora?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public fechaIngreso?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  public fechaIngresoReal?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  public fechaSalida?: Date;
}

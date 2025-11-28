import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { NAME_NUMBER_REGEX, NAME_REGEX } from '../../utils/constants/constants';

export class PersonalUpdateDTO {
  @ApiProperty({
    pattern: '^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\\s]+$',
    description: 'El campo Nombre solo debe tener letras',
  })
  @IsOptional()
  @Matches(NAME_REGEX, {
    message:
      'El campo nombre no puede contener números ni otros caracteres especiales',
  })
  public nombre?: string;

  @ApiProperty({
    pattern: '^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\\s]+$',
    description: 'El campo Apellido solo debe tener letras',
  })
  @IsOptional()
  @Matches(NAME_REGEX, {
    message:
      'El campo apellido no puede contener números ni otros caracteres especiales',
  })
  public apellido?: string;

  @ApiProperty({
    example: 'asdas@asdsd.com',
  })
  @IsEmail({}, { message: 'El formato del campo email es incorrecto' })
  @IsOptional()
  public email?: string;

  @ApiProperty({
    description: 'El número de documento debe tener entre 7 y 8 dígitos',
  })
  @IsOptional()
  @Length(7, 8, {
    message: 'El número de documento debe tener entre 7 y 8 dígitos',
  })
  public nroDocumento?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'El teléfono debe tener como máximo 15 caracteres',
  })
  @Matches(NAME_NUMBER_REGEX, {
    message: 'El campo telefono solo puede contener números',
  })
  @MaxLength(15, {
    message: 'El teléfono ingresado excede los 15 caracteres esperados.',
  })
  public telefono?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'El campo activo debe ser true o false',
  })
  public activo?: boolean;
}

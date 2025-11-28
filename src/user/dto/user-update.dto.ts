import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { NAME_NUMBER_REGEX, NAME_REGEX } from '../../utils/constants/constants';

export class UserUpdateDTO {
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
    example: 'asdas@asdsd.com',
  })
  @IsEmail({}, { message: 'El formato del campo email es incorrecto' })
  @IsOptional()
  public mail?: string;

  @ApiProperty({
    description: 'El número de documento debe tener entre 7 y 8 dígitos',
  })
  @IsOptional()
  @Length(7, 8, {
    message: 'El número de documento debe tener entre 7 y 8 dígitos',
  })
  public dni?: string;

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
}

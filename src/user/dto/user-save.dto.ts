import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { NAME_NUMBER_REGEX, NAME_REGEX } from '../../utils/constants/constants';

export class UserSaveDTO {
  @ApiProperty({
    pattern: '^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\\s]+$',
    description: 'El campo Nombre solo debe tener letras',
    example: 'Juan',
  })
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacio' })
  @Matches(NAME_REGEX, {
    message:
      'El campo nombre no puede contener números ni otros caracteres especiales',
  })
  public nombre: string;

  @ApiProperty({
    example: 'prueba123@exmaple.com',
  })
  @IsEmail({}, { message: 'El formato del campo mail es incorrecto' })
  @IsNotEmpty({ message: 'El campo mail no puede estar vacio' })
  public mail: string;

  @ApiProperty({
    description: 'El número de documento debe tener entre 7 y 8 dígitos',
    example: '12345678',
  })
  @IsNotEmpty({ message: 'El campo dni no puede estar vacio' })
  @Length(7, 8, {
    message: 'El dni debe tener entre 7 y 8 dígitos',
  })
  public dni: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'El teléfono debe tener como máximo 15 caracteres',
    example: '1123456789',
  })
  @Matches(NAME_NUMBER_REGEX, {
    message: 'El campo telefono solo puede contener números',
  })
  @MaxLength(15, {
    message: 'El teléfono ingresado excede los 15 caracteres esperados.',
  })
  public telefono: string;
}

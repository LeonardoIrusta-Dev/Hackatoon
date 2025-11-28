import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsNotEmpty({ message: 'El campo email no puede estar vacio' })
  email: string;

  @ApiProperty({
    example: 'Abuelo123',
  })
  @IsNotEmpty({ message: 'El campo password no puede estar vacio' })
  password: string;
}

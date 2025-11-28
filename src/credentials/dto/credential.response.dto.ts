import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserCredencialesDTO {
  @ApiProperty()
  @Expose()
  public idUsuario: number;

  @ApiProperty()
  @Expose()
  public usuario: string;

  @ApiProperty()
  @Expose()
  public contrasena: string;
}

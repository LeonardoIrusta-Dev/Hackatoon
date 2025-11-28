import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PersonalFindAllDTO {
  @ApiProperty()
  @Expose()
  public id: number;

  @ApiProperty()
  @Expose()
  public nombre: string;

  @ApiProperty()
  @Expose()
  public apellido: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public nroDocumento: string;

  @ApiProperty()
  @Expose()
  public telefono: string;

  @ApiProperty()
  @Expose()
  public activo: boolean;
}

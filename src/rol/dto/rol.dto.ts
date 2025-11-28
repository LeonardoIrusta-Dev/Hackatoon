import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RolDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  nombre: string;

  @ApiProperty()
  @Expose()
  descripcion: string;
}

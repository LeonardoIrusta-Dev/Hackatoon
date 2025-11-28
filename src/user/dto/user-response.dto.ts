import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { RolDTO } from '../../rol/dto/rol.dto';
import { UserCredencialesDTO } from '../../credentials/dto/credential.response.dto';

export class UserFindAllDTO {
  @ApiProperty()
  @Expose()
  public id: number;

  @ApiProperty()
  @Expose()
  public nombre: string;

  @ApiProperty()
  @Expose()
  public mail: string;

  @ApiProperty()
  @Expose()
  public dni: string;

  @ApiProperty()
  @Expose()
  public telefono: string;

  @ApiProperty({ type: [RolDTO] })
  @Expose()
  @Type(() => RolDTO)
  roles?: RolDTO[];

  @ApiProperty()
  @Expose()
  public credenciales?: UserCredencialesDTO;
}

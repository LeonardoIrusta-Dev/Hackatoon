import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibGVvaXJ1c3RhNTAyQGdtYWlsLmNvbSIsImlhdCI6MTc2NDM1MzU4NywiZXhwIjoxNzY0MzYwNzg3fQ.e3rFSEXBVNSW_QSRWSJzqFDIwbO3lZ5etxO4wfNJhBg',
  })
  @Expose()
  public token: string;

  @ApiProperty({
    example: '1',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    example: 'example@gmail.com',
  })
  @Expose()
  public mail: string;
}

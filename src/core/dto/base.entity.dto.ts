import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BaseEntityDTO {

    @Expose()
    @ApiProperty()
    public createdAt: Date;
  
    @Expose()
    @ApiProperty()
    public createdUserId: number | null;
  
    @Expose()
    @ApiProperty()
    public updatedAt: Date;
  
    @Expose()
    @ApiProperty()
    public updatedUserId: number | null;

    @Expose()
    @ApiProperty()
    public deletedAt: Date;

    @Expose()
    @ApiProperty()
    public deletedUserId: number | null;
  }
  
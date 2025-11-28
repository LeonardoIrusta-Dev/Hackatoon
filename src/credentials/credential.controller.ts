import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { CredentialService } from './credential.service';
import { UserCredencialesDTO } from './dto/credential.response.dto';

@ApiTags('Credential')
@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}
  // @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserCredencialesDTO,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<UserCredencialesDTO | null> {
    return await this.credentialService.findCredentialByUserId(Number(userId));
  }
}

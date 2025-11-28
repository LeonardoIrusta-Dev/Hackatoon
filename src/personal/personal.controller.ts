import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonalService } from './personal.service';
import { PersonalFindAllDTO } from './dto/personal-response.dto';
import { PersonalSaveDTO } from './dto/personal-save.dto';
import { PersonalUpdateDTO } from './dto/personal-update.dto';

@ApiTags('Personal')
@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post()
  @ApiBody({ type: PersonalSaveDTO })
  @ApiResponse({
    status: 201,
    description: 'The personal has been created.',
    type: PersonalFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async save(
    @Body() personalDTO: PersonalSaveDTO,
  ): Promise<PersonalFindAllDTO> {
    return await this.personalService.savePersonal(personalDTO);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of personal',
    type: [PersonalFindAllDTO],
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAllPersonals(): Promise<PersonalFindAllDTO[]> {
    return await this.personalService.findAllPersonals();
  }

  @Get('/:personalId')
  @ApiResponse({
    status: 200,
    description: 'Personal found',
    type: PersonalFindAllDTO,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findPersonalById(
    @Param('personalId') personalId: string,
  ): Promise<PersonalFindAllDTO | null> {
    return await this.personalService.findByPersonalId(Number(personalId));
  }

  @Patch('/:personalId')
  @ApiBody({ type: PersonalUpdateDTO })
  @ApiResponse({
    status: 201,
    description: 'The personal has been update.',
    type: PersonalFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async update(
    @Body() personalDTO: PersonalUpdateDTO,
    @Param('personalId') personalId: string,
  ): Promise<PersonalFindAllDTO | null> {
    return await this.personalService.updatePersonal(
      Number(personalId),
      personalDTO,
    );
  }

  @Delete('/:personalId')
  @ApiResponse({
    status: 200,
    description: 'The personal has been desactivated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async desactivePersonal(
    @Param('personalId') personalId: string,
  ): Promise<{ message: string }> {
    return await this.personalService.desactivatePersonal(Number(personalId));
  }
}

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
import { VisitService } from './visit.service';
import { VisitFindAllDTO } from './dto/visit-response.dto';
import { VisitSaveDTO } from './dto/visit-save.dto';
import { VisitUpdateDTO } from './dto/visit-update.dto';

@ApiTags('Visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Lista todas las visitas.',
    type: [VisitFindAllDTO],
  })
  async findAll(): Promise<VisitFindAllDTO[]> {
    return await this.visitService.findAllVisits();
  }

  @Get('/:visitId')
  @ApiResponse({
    status: 200,
    description: 'Retorna la visita por id.',
    type: VisitFindAllDTO,
  })
  @ApiResponse({ status: 404, description: 'Visit not found.' })
  async findById(
    @Param('visitId') visitId: string,
  ): Promise<VisitFindAllDTO | null> {
    return await this.visitService.findByVisitId(Number(visitId));
  }

  @Post('/')
  @ApiBody({ type: VisitSaveDTO })
  @ApiResponse({
    status: 201,
    description: 'Crea una nueva visita.',
    type: VisitFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() body: VisitSaveDTO): Promise<VisitFindAllDTO> {
    return await this.visitService.saveVisit(body);
  }

  @Patch('/:visitId')
  @ApiBody({ type: VisitUpdateDTO })
  @ApiResponse({
    status: 200,
    description: 'Actualiza una visita existente.',
    type: VisitFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Visit not found.' })
  async update(
    @Param('visitId') visitId: string,
    @Body() body: VisitUpdateDTO,
  ): Promise<VisitFindAllDTO | null> {
    return await this.visitService.updateVisit(Number(visitId), body);
  }

  @Delete('/:visitId')
  @ApiResponse({
    status: 200,
    description: 'La visita ha sido desactivada.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async desactiveVisit(
    @Param('visitId') visitId: string,
  ): Promise<{ message: string }> {
    return await this.visitService.desactivateVisit(Number(visitId));
  }
}

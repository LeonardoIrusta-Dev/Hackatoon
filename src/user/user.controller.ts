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
import { UserService } from './user.service';
import { UserFindAllDTO } from './dto/user-response.dto';
import { UserSaveDTO } from './dto/user-save.dto';
import { UserUpdateDTO } from './dto/user-update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserSaveDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    type: UserFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async save(@Body() userDTO: UserSaveDTO): Promise<UserFindAllDTO> {
    return await this.userService.saveUser(userDTO);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserFindAllDTO],
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findAllUsers(): Promise<UserFindAllDTO[]> {
    return await this.userService.findAllUsers();
  }

  @Get('/:userId')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserFindAllDTO,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async findByUserId(
    @Param('userId') userId: string,
  ): Promise<UserFindAllDTO | null> {
    return await this.userService.findByUserId(Number(userId));
  }

  @Patch('/:userId')
  @ApiBody({ type: UserUpdateDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been update.',
    type: UserFindAllDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async update(
    @Body() userDTO: UserUpdateDTO,
    @Param('userId') userId: string,
  ): Promise<UserFindAllDTO | null> {
    return await this.userService.updateUser(Number(userId), userDTO);
  }

  @Delete('/:userId')
  @ApiResponse({
    status: 200,
    description: 'The user has been desactivated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async desactivePersonal(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return await this.userService.desactivateUser(Number(userId));
  }
}

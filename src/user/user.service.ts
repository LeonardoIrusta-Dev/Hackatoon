import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './infrastructure/persistence/relational/repositories/user.repository';
import { UserFindAllDTO } from './dto/user-response.dto';
import { UserSaveDTO } from './dto/user-save.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { IUserService } from './domain/interfaces/user.service.interface';
import { TransactionManager } from '../core/infrastructure/persistence/relational/database/transaction-maganer';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  public async findAllUsers() {
    return this.userRepository.findAllUsers();
  }

  public async findByUserId(id: number): Promise<UserFindAllDTO | null> {
    return this.userRepository.findByUserId(id);
  }

  public async saveUser(saveDTO: UserSaveDTO): Promise<UserFindAllDTO> {
    try {
      return await this.transactionManager.execute(async (em) => {
        const user = this.userRepository.create(saveDTO);

        return this.userRepository.saveUser(user, em);
      });
    } catch (error) {
      if (error.getStatus) throw error;

      throw new BadRequestException('No se pudo guardar el usuario');
    }
  }

  public async updateUser(
    userId: number,
    updateDto: UserUpdateDTO,
  ): Promise<UserFindAllDTO | null> {
    try {
      return await this.transactionManager.execute(async (em) => {
        const existsUser = await this.userRepository.findOne({
          where: { id: userId },
        });

        if (!existsUser) {
          throw new NotFoundException(
            `El usuario con id ${userId} no fue encontrado`,
          );
        }

        return this.userRepository.updateUser(updateDto, existsUser, em);
      });
    } catch (error) {
      if (error.getStatus) throw error;

      throw new BadRequestException('No se pudo actualizar el usuario');
    }
  }

  public async desactivateUser(userId: number): Promise<{ message: string }> {
    try {
      const affectedRows = await this.userRepository.desactivarUser(userId);

      if (affectedRows === 0) {
        throw new BadRequestException(
          'El registro no se puede desactivar porque está activo o no existe.',
        );
      }

      return { message: 'El usario ha sido desactivado correctamente.' };
    } catch (error) {
      if (error.getStatus) throw error;

      throw new InternalServerErrorException(
        'No se pudo desactivar el usuario',
      );
    }
  }
}

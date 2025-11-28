import { EntityManager } from 'typeorm';
import { UserFindAllDTO } from '../../dto/user-response.dto';
import { UserEntity } from '../../infrastructure/persistence/relational/entities/user.entity';
import { UserUpdateDTO } from '../../dto/user-update.dto';
import { UserSaveDTO } from '../../dto/user-save.dto';

export interface IUserRepository {
  findAllUsers(): Promise<UserFindAllDTO[]>;
  findByUserId(id: number): Promise<UserFindAllDTO | null>;
  saveUser(
    user: UserSaveDTO,
    entityManager?: EntityManager,
  ): Promise<UserFindAllDTO>;
  updateUser(
    updateDto: UserUpdateDTO,
    existsPersonal: UserEntity,
    entityManager?: EntityManager,
  ): Promise<UserFindAllDTO>;
  desactivarUser(personalId: number): Promise<number>;
}

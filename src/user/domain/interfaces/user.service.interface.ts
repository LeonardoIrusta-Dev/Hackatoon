import { UserFindAllDTO } from '../../dto/user-response.dto';
import { UserEntity } from '../../infrastructure/persistence/relational/entities/user.entity';
import { UserSaveDTO } from '../../dto/user-save.dto';
import { UserUpdateDTO } from '../../dto/user-update.dto';

export interface IUserService {
  findAllUsers(): Promise<UserFindAllDTO[]>;
  findByUserId(id: number): Promise<UserFindAllDTO | null>;
  findUserByEmail(email: string): Promise<UserFindAllDTO | null>;
  // Returns a raw UserEntity with relations (e.g., credenciales) - useful for authentication
  findEntityByEmail(email: string): Promise<UserEntity | null>;
  saveUser(saveDTO: UserSaveDTO): Promise<UserFindAllDTO>;
  updateUser(
    userId: number,
    updateDto: UserUpdateDTO,
  ): Promise<UserFindAllDTO | null>;
  desactivateUser(personalId: number): Promise<{ message: string }>;
}

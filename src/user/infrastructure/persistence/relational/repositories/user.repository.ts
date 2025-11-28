import { Injectable } from '@nestjs/common';
import { TransactionalRepository } from '../../../../../utils/repositories/transactional.repository';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { UserUpdateDTO } from '../../../../dto/user-update.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserFindAllDTO } from '../../../../dto/user-response.dto';
import { IUserRepository } from '../../../../domain/interfaces/user.repository.interface';
import { UserSaveDTO } from '../../../../dto/user-save.dto';

@Injectable()
export class UserRepository
  extends TransactionalRepository<UserEntity, UserRepository>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly entityManager: EntityManager,
  ) {
    super(UserEntity, userRepository);
  }

  // 👇 Cambiamos el tipo del parámetro a "any"
  transactional(manager: any): UserRepository {
    if (!(manager instanceof EntityManager)) {
      throw new Error('Invalid transaction manager for TypeORM repository');
    }

    return this.fromEntityManager(
      manager,
      (repository) => new UserRepository(repository, manager),
    );
  }

  private getRepository(
    manager?: any,
  ): UserRepository | Repository<UserEntity> {
    return manager ? this.transactional(manager) : this.userRepository;
  }

  async findAllUsers(): Promise<UserFindAllDTO[]> {
    const find = await this.userRepository.find();
    return find.map((user) => UserMapper.fromEntityToResponseDTO(user));
  }

  async findByUserId(id: number): Promise<UserFindAllDTO | null> {
    const find = await this.userRepository.findOne({
      where: { id },
      relations: ['usuariosRoles', 'usuariosRoles.rol', 'credenciales'],
    });

    if (!find) return null;
    return UserMapper.fromEntityToResponseDTO(find);
  }

  async findUserByEmail(mail: string): Promise<UserFindAllDTO | null> {
    const find = await this.userRepository.findOne({
      where: { mail },
      relations: ['usuariosRoles', 'usuariosRoles.rol', 'credenciales'],
    });

    if (!find) return null;
    return UserMapper.fromEntityToResponseDTO(find);
  }

  async findEntityByEmail(mail: string): Promise<UserEntity | null> {
    const find = await this.userRepository.findOne({
      where: { mail },
      relations: ['usuariosRoles', 'usuariosRoles.rol', 'credenciales'],
    });

    if (!find) return null;

    return find;
  }

  async saveUser(saveDTO: UserSaveDTO, manager?: any): Promise<UserFindAllDTO> {
    const repo = this.getRepository(manager);
    const save = await repo.save(UserMapper.frontSaveDTOtoEntity(saveDTO));
    return UserMapper.fromEntityToResponseDTO(save);
  }

  async updateUser(
    updateDto: UserUpdateDTO,
    existsUser: UserEntity,
    manager?: any,
  ): Promise<UserFindAllDTO> {
    const repo = this.getRepository(manager);
    const update = await repo.save(
      UserMapper.frontUpdateDTOtoEntity(updateDto, existsUser),
    );
    return UserMapper.fromEntityToResponseDTO(update);
  }

  async desactivarUser(userId: number): Promise<number> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ Fec_Baja: new Date() })
      .where('id = :personalId', { userId })
      .execute();

    return result.affected ?? 0;
  }
}

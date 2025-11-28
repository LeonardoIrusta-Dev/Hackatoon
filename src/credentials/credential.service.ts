import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionManager } from '../core/infrastructure/persistence/relational/database/transaction-maganer';
import { ICredentialService } from './domain/interfaces/credential.service.interface';
import { CredentialRepository } from './infrastructure/persistence/relational/repositories/credential.repository';
import { UserCredencialesDTO } from './dto/credential.response.dto';


@Injectable()
export class CredentialService implements ICredentialService {
  constructor(
    private readonly credentialRepository: CredentialRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  public async findCredentialByUserId(id: number): Promise<UserCredencialesDTO | null> {
    return this.credentialRepository.findCredentialByUserId(id);
  }
}

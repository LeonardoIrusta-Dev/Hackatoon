import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredencialesEntity } from './entities/credential.entity';
import { CredentialRepository } from './repositories/credential.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CredencialesEntity])],
  providers: [CredentialRepository],
  exports: [CredentialRepository],
})
export class CredentialRelationalPersistenceModule {}

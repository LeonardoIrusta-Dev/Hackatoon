import { Module } from '@nestjs/common';
import { CoreEntityRelationalPersistenceModule } from '../core/infrastructure/persistence/relational/core-relational-persistence.module';
import { CredentialRelationalPersistenceModule } from './infrastructure/persistence/relational/credential-relational-persistence.module';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

@Module({
  imports: [
    CredentialRelationalPersistenceModule,
    CoreEntityRelationalPersistenceModule,
  ],
  controllers: [CredentialController],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}

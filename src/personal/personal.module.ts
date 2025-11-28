import { Module } from '@nestjs/common';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { PersonaRelationalPersistenceModule } from './infrastructure/persistence/relational/personal-relational-persistence.module';
import { CoreEntityRelationalPersistenceModule } from '../core/infrastructure/persistence/relational/core-relational-persistence.module';

@Module({
  imports: [
    PersonaRelationalPersistenceModule,
    CoreEntityRelationalPersistenceModule,
  ],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule {}

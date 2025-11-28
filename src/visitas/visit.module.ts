import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { VisitRelationalPersistenceModule } from './infrastructure/persistence/relational/visit-relational-persistence.module';
import { CoreEntityRelationalPersistenceModule } from '../core/infrastructure/persistence/relational/core-relational-persistence.module';

@Module({
  imports: [
    VisitRelationalPersistenceModule,
    CoreEntityRelationalPersistenceModule,
  ],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}

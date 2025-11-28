import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitRepository } from './repositories/visit.repository';
import { VisitEntity } from './entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitEntity])],
  providers: [VisitRepository],
  exports: [VisitRepository],
})
export class VisitRelationalPersistenceModule {}

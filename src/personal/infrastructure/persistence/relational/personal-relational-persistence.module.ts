import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalRepository } from './repositories/personal.repository';
import { PersonalEntity } from './entities/personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalEntity])],
  providers: [PersonalRepository],
  exports: [PersonalRepository],
})
export class PersonaRelationalPersistenceModule {}

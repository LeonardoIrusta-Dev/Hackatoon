import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRelationalPersistenceModule } from './infrastructure/persistence/relational/user-relational-persistence.module';
import { CoreEntityRelationalPersistenceModule } from '../core/infrastructure/persistence/relational/core-relational-persistence.module';

@Module({
  imports: [
    UserRelationalPersistenceModule,
    CoreEntityRelationalPersistenceModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

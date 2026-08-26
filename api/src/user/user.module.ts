import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserService } from './services/create-user/create-user.service';
import { GetUserService } from './services/get-user/get-user.service';
import { SelectUserByIdRepository } from './repositories/select-user-by-id.repository';
import { InsertUserRepository } from './repositories/insert-user.repository';
import { SelectUserByEmailRepository } from './repositories/select-user-by-email.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserService, GetUserService, SelectUserByIdRepository, InsertUserRepository, SelectUserByEmailRepository],
  exports: [CreateUserService, GetUserService]
})
export class UserModule { }

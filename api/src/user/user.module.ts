import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { CreateUserService } from '@/user/services/create-user/create-user.service';
import { GetUserService } from '@/user/services/get-user/get-user.service';
import { SelectUserByIdRepository } from '@/user/repositories/select-user-by-id.repository';
import { InsertUserRepository } from '@/user/repositories/insert-user.repository';
import { SelectUserByEmailRepository } from '@/user/repositories/select-user-by-email.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserService, GetUserService, SelectUserByIdRepository, InsertUserRepository, SelectUserByEmailRepository],
  exports: [CreateUserService, GetUserService]
})
export class UserModule { }

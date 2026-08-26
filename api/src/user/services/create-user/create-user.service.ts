import { Injectable } from '@nestjs/common';
import { CreateUserInputDTO } from 'src/user/dtos/create-user-input.dto';
import { InsertUserRepository } from 'src/user/repositories/insert-user.repository';
import { hash } from 'bcrypt';
import { SALTS_OR_ROUNDS } from 'src/shared/constants/bcrypt';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly insertUserRepository: InsertUserRepository

  ) { }

  public async createUser(dto: CreateUserInputDTO) {
    const passwordHash = await hash(dto.password, SALTS_OR_ROUNDS)

    return this.insertUserRepository.execute({
      name: dto.name,
      email: dto.email,
      passwordHash,
    })
  }
}

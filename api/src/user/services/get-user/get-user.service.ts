import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exception';
import { SelectUserByEmailRepository } from 'src/user/repositories/select-user-by-email.repository';
import { SelectUserByIdRepository } from 'src/user/repositories/select-user-by-id.repository';

@Injectable()
export class GetUserService {
  constructor(
    private readonly selectUserByIdRepostory: SelectUserByIdRepository,
    private readonly selectUserByEmailRepository: SelectUserByEmailRepository
  ) { }

  public async getById(id: string) {
    const user = await this.selectUserByIdRepostory.execute(id)

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }

  public async getByEmail(email: string) {
    const user = await this.selectUserByEmailRepository.execute(email)

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }
}

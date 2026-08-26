import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user.entity'

@Injectable()
export class InsertUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async execute(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data)
    return this.repo.save(user)
  }
}

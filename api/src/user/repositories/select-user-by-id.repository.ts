import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/user/user.entity'

@Injectable()
export class SelectUserByIdRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } })
  }
}



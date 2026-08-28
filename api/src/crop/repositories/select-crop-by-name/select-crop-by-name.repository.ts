import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Crop } from '@/crop/crop.entity'

@Injectable()
export class SelectCropByNameRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repo: Repository<Crop>,
  ) { }

  async execute(name: string): Promise<Crop | null> {
    return this.repo
      .createQueryBuilder('crop')
      .where(`crop."deletedAt" IS NULL`)
      .andWhere(
        `unaccent(crop."name") ILIKE unaccent(:name)`,
        { name },
      )
      .getOne()
  }
}

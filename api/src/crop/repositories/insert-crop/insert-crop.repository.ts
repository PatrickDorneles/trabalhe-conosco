import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Crop } from '@/crop/crop.entity'

@Injectable()
export class InsertCropRepository {
  constructor(
    @InjectRepository(Crop)
    private readonly repo: Repository<Crop>,
  ) { }

  async execute(data: Partial<Crop>): Promise<Crop> {
    const crop = this.repo.create(data)
    return this.repo.save(crop)
  }
}
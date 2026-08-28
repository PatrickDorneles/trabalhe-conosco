import { Injectable, Logger } from '@nestjs/common';
import { Crop } from '@/crop/crop.entity';
import { CreateCropInputDTO } from '@/crop/dtos/create-crop-input.dto';
import { SelectCropByNameRepository } from '@/crop/repositories/select-crop-by-name/select-crop-by-name.repository';
import { InsertCropRepository } from '@/crop/repositories/insert-crop/insert-crop.repository';

@Injectable()
export class CreateCropService {
  private readonly logger = new Logger(CreateCropService.name)

  constructor(
    private readonly selectCropByNameRepository: SelectCropByNameRepository,
    private readonly insertCropRepository: InsertCropRepository,
  ) { }

  async execute(dto: CreateCropInputDTO): Promise<Crop> {
    const name = dto.name.trim()

    this.logger.log(`Attempting to insert crop: ${name}`)

    const existing = await this.selectCropByNameRepository.execute(name)
    if (existing) {
      this.logger.log(`Crop called ${name} already exists (${existing.id}), returning it`)
      return existing
    }

    const crop = await this.insertCropRepository.execute({ name })
    this.logger.log(`Crop (${crop.id}) created successfully`)
    return crop
  }
}

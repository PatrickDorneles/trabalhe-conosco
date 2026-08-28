import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Crop } from '@/crop/crop.entity'
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';
import { SearchCropsService } from '@/crop/services/search-crops/search-crops.service';
import { InsertCropRepository } from '@/crop/repositories/insert-crop/insert-crop.repository';
import { SearchCropsRepository } from '@/crop/repositories/search-crops/search-crops.repository';
import { SelectCropByNameRepository } from '@/crop/repositories/select-crop-by-name/select-crop-by-name.repository';
import { CropController } from '@/crop/crop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  exports: [TypeOrmModule, CreateCropService],
  providers: [
    CreateCropService,
    SearchCropsService,
    InsertCropRepository,
    SearchCropsRepository,
    SelectCropByNameRepository,
  ],
  controllers: [CropController],
})
export class CropModule {}
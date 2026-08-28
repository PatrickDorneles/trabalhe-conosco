import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerCrop } from '@/producer-crop/producer-crop.entity';
import { RuralPropertyModule } from '@/rural-property/rural-property.module';
import { HarvestModule } from '@/harvest/harvest.module';
import { CropModule } from '@/crop/crop.module';
import { CreateProducerCropService } from './services/create-producer-crop/create-producer-crop.service';
import { UpdateProducerCropService } from './services/update-producer-crop/update-producer-crop.service';
import { DeleteProducerCropService } from './services/delete-producer-crop/delete-producer-crop.service';
import { ListProducerCropService } from './services/list-producer-crop/list-producer-crop.service';
import { GetProducerCropService } from './services/get-producer-crop/get-producer-crop.service';
import { InsertProducerCropRepository } from '@/producer-crop/repositories/insert-producer-crop/insert-producer-crop.repository';
import { SelectProducerCropByIdRepository } from '@/producer-crop/repositories/select-producer-crop-by-id/select-producer-crop-by-id.repository';
import { SelectAllProducerCropsRepository } from '@/producer-crop/repositories/select-all-producer-crops/select-all-producer-crops.repository';
import { UpdateProducerCropRepository } from '@/producer-crop/repositories/update-producer-crop/update-producer-crop.repository';
import { DeleteProducerCropRepository } from '@/producer-crop/repositories/delete-producer-crop/delete-producer-crop.repository';
import { ProducerCropController } from './producer-crop.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProducerCrop]),
    RuralPropertyModule,
    HarvestModule,
    CropModule,
  ],
  exports: [TypeOrmModule],
  providers: [
    CreateProducerCropService,
    GetProducerCropService,
    UpdateProducerCropService,
    DeleteProducerCropService,
    ListProducerCropService,
    InsertProducerCropRepository,
    SelectProducerCropByIdRepository,
    SelectAllProducerCropsRepository,
    UpdateProducerCropRepository,
    DeleteProducerCropRepository,
  ],
  controllers: [ProducerCropController],
})
export class ProducerCropModule { }

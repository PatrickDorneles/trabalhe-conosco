import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './producer.entity';
import { ProducerCrop } from './producer-crop.entity';
import { CropModule } from '../crop/crop.module';
import { HarvestModule } from '../harvest/harvest.module';
import { ProducersController } from './producers.controller';
import { RegisterProducerService } from './services/register-producer/register-producer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer, ProducerCrop]),
    CropModule,
    HarvestModule,
  ],
  providers: [RegisterProducerService],
  controllers: [ProducersController]
})
export class ProducersModule { }

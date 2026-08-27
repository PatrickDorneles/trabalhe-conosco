import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './producer.entity';
import { ProducerCrop } from './producer-crop.entity';
import { RuralPropertyModule } from '../rural-property/rural-property.module';
import { HarvestModule } from '../harvest/harvest.module';
import { CropModule } from '../crop/crop.module';
import { ProducersController } from './producers.controller';
import { CreateProducerService } from './services/create-producer/create-producer.service';
import { ListProducersService } from './services/list-producers/list-producers.service';
import { GetProducerService } from './services/get-producer/get-producer.service';
import { UpdateProducerService } from './services/update-producer/update-producer.service';
import { DeleteProducerService } from './services/delete-producer/delete-producer.service';
import { InsertProducerRepository } from './repositories/insert-producer/insert-producer.repository';
import { SelectProducerByIdRepository } from './repositories/select-producer-by-id/select-producer-by-id.repository';
import { SelectProducerByDocumentRepository } from './repositories/select-producer-by-document/select-producer-by-document.repository';
import { SelectAllProducersRepository } from './repositories/select-all-producers/select-all-producers.repository';
import { UpdateProducerRepository } from './repositories/update-producer/update-producer.repository';
import { DeleteProducerRepository } from './repositories/delete-producer/delete-producer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer, ProducerCrop]),
    forwardRef(() => RuralPropertyModule),
    HarvestModule,
    CropModule,
  ],
  controllers: [ProducersController],
  providers: [
    CreateProducerService,
    ListProducersService,
    GetProducerService,
    UpdateProducerService,
    DeleteProducerService,
    InsertProducerRepository,
    SelectProducerByIdRepository,
    SelectProducerByDocumentRepository,
    SelectAllProducersRepository,
    UpdateProducerRepository,
    DeleteProducerRepository,
  ],
  exports: [GetProducerService],
})
export class ProducersModule { }

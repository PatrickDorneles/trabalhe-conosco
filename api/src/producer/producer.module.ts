import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from '@/producer/producer.entity';
import { ProducerCrop } from '@/harvest/producer-crop.entity';
import { RuralPropertyModule } from '@/rural-property/rural-property.module';
import { HarvestModule } from '@/harvest/harvest.module';
import { CropModule } from '@/crop/crop.module';
import { ProducerController } from '@/producer/producer.controller';
import { CreateProducerService } from '@/producer/services/create-producer/create-producer.service';
import { ListProducersService } from '@/producer/services/list-producers/list-producers.service';
import { GetProducerService } from '@/producer/services/get-producer/get-producer.service';
import { UpdateProducerService } from '@/producer/services/update-producer/update-producer.service';
import { DeleteProducerService } from '@/producer/services/delete-producer/delete-producer.service';
import { InsertProducerRepository } from '@/producer/repositories/insert-producer/insert-producer.repository';
import { SelectProducerByIdRepository } from '@/producer/repositories/select-producer-by-id/select-producer-by-id.repository';
import { SelectProducerByDocumentRepository } from '@/producer/repositories/select-producer-by-document/select-producer-by-document.repository';
import { SelectAllProducersRepository } from '@/producer/repositories/select-all-producers/select-all-producers.repository';
import { UpdateProducerRepository } from '@/producer/repositories/update-producer/update-producer.repository';
import { DeleteProducerRepository } from '@/producer/repositories/delete-producer/delete-producer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer, ProducerCrop]),
    forwardRef(() => RuralPropertyModule),
    HarvestModule,
    CropModule,
  ],
  controllers: [ProducerController],
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
export class ProducerModule { }

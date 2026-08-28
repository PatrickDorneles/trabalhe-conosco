import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'
import { ProducerModule } from '@/producer/producer.module'
import { CreatePropertyService } from '@/rural-property/services/create-property/create-property.service';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { UpdatePropertyService } from '@/rural-property/services/update-property/update-property.service';
import { DeletePropertyService } from '@/rural-property/services/delete-property/delete-property.service';
import { ListPropertiesService } from '@/rural-property/services/list-properties/list-properties.service';
import { InsertPropertyRepository } from '@/rural-property/repositories/insert-property.repository';
import { SelectPropertyByIdRepository } from '@/rural-property/repositories/select-property-by-id.repository';
import { SelectAllPropertiesRepository } from '@/rural-property/repositories/select-all-properties.repository';
import { UpdatePropertyRepository } from '@/rural-property/repositories/update-property.repository';
import { DeletePropertyRepository } from '@/rural-property/repositories/delete-property.repository';
import { PropertyAreaValidator } from '@/rural-property/validators/property-area.validator';
import { RuralPropertyController } from '@/rural-property/rural-property.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuralProperty]),
    forwardRef(() => ProducerModule),
  ],
  exports: [TypeOrmModule, GetPropertyService],
  providers: [
    CreatePropertyService,
    GetPropertyService,
    UpdatePropertyService,
    DeletePropertyService,
    ListPropertiesService,
    PropertyAreaValidator,
    InsertPropertyRepository,
    SelectPropertyByIdRepository,
    SelectAllPropertiesRepository,
    UpdatePropertyRepository,
    DeletePropertyRepository,
  ],
  controllers: [RuralPropertyController],
})
export class RuralPropertyModule { }

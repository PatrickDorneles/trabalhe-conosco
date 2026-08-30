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
import { CountPropertiesRepository } from '@/rural-property/repositories/count-properties.repository';
import { SumTotalAreaRepository } from '@/rural-property/repositories/sum-total-area.repository';
import { CountPropertiesByStateRepository } from '@/rural-property/repositories/count-properties-by-state.repository';
import { CountLandUseByTypeRepository } from '@/rural-property/repositories/count-land-use-by-type.repository';
import { PropertyAreaValidator } from '@/rural-property/validators/property-area.validator';
import { RuralPropertyController } from '@/rural-property/rural-property.controller';
import { CountPropertiesByStateService } from './services/count-properties-by-state/count-properties-by-state.service';
import { CountLandUseByTypeService } from './services/count-land-use-by-type/count-land-use-by-type.service';
import { CountPropertiesService } from './services/count-properties/count-properties.service';
import { SumTotalAreaService } from './services/sum-total-area/sum-total-area.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuralProperty]),
    forwardRef(() => ProducerModule),
  ],
  exports: [
    TypeOrmModule,
    GetPropertyService,
    CountPropertiesByStateService,
    CountLandUseByTypeService,
    CountPropertiesService,
    SumTotalAreaService,
  ],
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
    CountPropertiesByStateRepository,
    CountLandUseByTypeRepository,
    CountPropertiesRepository,
    SumTotalAreaRepository,
    CountPropertiesByStateService,
    CountLandUseByTypeService,
    CountPropertiesService,
    SumTotalAreaService,
  ],
  controllers: [RuralPropertyController],
})
export class RuralPropertyModule { }

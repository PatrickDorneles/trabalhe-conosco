import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RuralProperty } from './rural-property.entity'
import { ProducersModule } from '../producers/producers.module'
import { CreatePropertyService } from './services/create-property/create-property.service';
import { GetPropertyService } from './services/get-property/get-property.service';
import { UpdatePropertyService } from './services/update-property/update-property.service';
import { DeletePropertyService } from './services/delete-property/delete-property.service';
import { ListPropertiesService } from './services/list-properties/list-properties.service';
import { InsertPropertyRepository } from './repositories/insert-property.repository';
import { SelectPropertyByIdRepository } from './repositories/select-property-by-id.repository';
import { SelectAllPropertiesRepository } from './repositories/select-all-properties.repository';
import { UpdatePropertyRepository } from './repositories/update-property.repository';
import { DeletePropertyRepository } from './repositories/delete-property.repository';
import { RuralPropertyController } from './rural-property.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RuralProperty]),
    forwardRef(() => ProducersModule),
  ],
  exports: [TypeOrmModule],
  providers: [
    CreatePropertyService,
    GetPropertyService,
    UpdatePropertyService,
    DeletePropertyService,
    ListPropertiesService,
    InsertPropertyRepository,
    SelectPropertyByIdRepository,
    SelectAllPropertiesRepository,
    UpdatePropertyRepository,
    DeletePropertyRepository,
  ],
  controllers: [RuralPropertyController],
})
export class RuralPropertyModule {}

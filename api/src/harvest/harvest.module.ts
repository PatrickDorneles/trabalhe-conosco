import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Harvest } from '@/harvest/harvest.entity'
import { CreateHarvestService } from '@/harvest/services/create-harvest/create-harvest.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { ListHarvestsService } from '@/harvest/services/list-harvests/list-harvests.service';
import { DeleteHarvestService } from '@/harvest/services/delete-harvest/delete-harvest.service';
import { InsertHarvestRepository } from '@/harvest/repositories/insert-harvest/insert-harvest.repository';
import { SelectHarvestByIdRepository } from '@/harvest/repositories/select-harvest-by-id/select-harvest-by-id.repository';
import { SelectAllHarvestsRepository } from '@/harvest/repositories/select-all-harvests/select-all-harvests.repository';
import { DeleteHarvestRepository } from '@/harvest/repositories/delete-harvest/delete-harvest.repository';
import { UpdateHarvestService } from '@/harvest/services/update-harvest/update-harvest.service';
import { UpdateHarvestRepository } from '@/harvest/repositories/update-harvest/update-harvest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest])],
  exports: [TypeOrmModule],
  providers: [
    CreateHarvestService,
    GetHarvestService,
    ListHarvestsService,
    DeleteHarvestService,
    InsertHarvestRepository,
    SelectHarvestByIdRepository,
    SelectAllHarvestsRepository,
    DeleteHarvestRepository,
    UpdateHarvestService,
    UpdateHarvestRepository,
  ],
})
export class HarvestModule { }

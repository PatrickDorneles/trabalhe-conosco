import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountPropertiesByStateService } from '@/rural-property/services/count-properties-by-state/count-properties-by-state.service';
import { CountLandUseByTypeService } from '@/rural-property/services/count-land-use-by-type/count-land-use-by-type.service';
import { CountPropertiesService } from '@/rural-property/services/count-properties/count-properties.service';
import { SumTotalAreaService } from '@/rural-property/services/sum-total-area/sum-total-area.service';
import { CountProducerCropsByCropService } from '@/producer-crop/services/count-producer-crops-by-crop/count-producer-crops-by-crop.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly countPropertiesService: CountPropertiesService,
    private readonly sumTotalAreaService: SumTotalAreaService,
    private readonly countPropertiesByStateService: CountPropertiesByStateService,
    private readonly countLandUseByTypeService: CountLandUseByTypeService,
    private readonly countProducerCropsByCropService: CountProducerCropsByCropService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Obter dados do dashboard' })
  @ApiResponse({ status: 200, description: 'Dados agregados de fazendas, hectares e gráficos' })
  async summary() {
    const [totalFarms, totalHectares, propertiesByState, landUseByType, plantedCropsByCrop] = await Promise.all([
      this.countPropertiesService.execute(),
      this.sumTotalAreaService.execute(),
      this.countPropertiesByStateService.execute(),
      this.countLandUseByTypeService.execute(),
      this.countProducerCropsByCropService.execute(),
    ]);

    return { totalFarms, totalHectares, propertiesByState, landUseByType, plantedCropsByCrop };
  }
}

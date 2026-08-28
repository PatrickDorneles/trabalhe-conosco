import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';
import { SearchCropsService } from '@/crop/services/search-crops/search-crops.service';
import { CreateCropInputDTO } from '@/crop/dtos/create-crop-input.dto';
import { SearchCropsInputDTO } from '@/crop/dtos/search-crops-input.dto';
import { Crop } from '@/crop/crop.entity';

@ApiTags('Culturas')
@ApiBearerAuth()
@Controller('crop')
export class CropController {
  constructor(
    private readonly createCropService: CreateCropService,
    private readonly searchCropsService: SearchCropsService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar cultura (retorna existente se já cadastrada)' })
  @ApiResponse({ status: 201, description: 'Cultura criada ou recuperada', type: Crop })
  async create(@Body() dto: CreateCropInputDTO): Promise<Crop> {
    return this.createCropService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar culturas' })
  @ApiResponse({ status: 200, description: 'Lista paginada de culturas' })
  async search(@Query() dto: SearchCropsInputDTO) {
    return this.searchCropsService.execute(dto.term ?? '', dto);
  }
}

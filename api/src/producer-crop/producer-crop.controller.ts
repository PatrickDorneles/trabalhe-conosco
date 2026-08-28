import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProducerCropService } from '@/producer-crop/services/create-producer-crop/create-producer-crop.service';
import { GetProducerCropService } from '@/producer-crop/services/get-producer-crop/get-producer-crop.service';
import { ListProducerCropService } from '@/producer-crop/services/list-producer-crop/list-producer-crop.service';
import { UpdateProducerCropService } from '@/producer-crop/services/update-producer-crop/update-producer-crop.service';
import { DeleteProducerCropService } from '@/producer-crop/services/delete-producer-crop/delete-producer-crop.service';
import { CreateProducerCropInputDTO } from '@/producer-crop/dtos/create-producer-crop-input.dto';
import { UpdateProducerCropInputDTO } from '@/producer-crop/dtos/update-producer-crop-input.dto';
import { ListProducerCropInputDTO } from '@/producer-crop/dtos/list-producer-crop-input.dto';

@ApiTags('Culturas Plantadas')
@ApiBearerAuth()
@Controller('producer-crop')
export class ProducerCropController {
  constructor(
    private readonly createProducerCropService: CreateProducerCropService,
    private readonly getProducerCropService: GetProducerCropService,
    private readonly listProducerCropService: ListProducerCropService,
    private readonly updateProducerCropService: UpdateProducerCropService,
    private readonly deleteProducerCropService: DeleteProducerCropService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar cultura plantada' })
  @ApiResponse({ status: 201, description: 'Cultura plantada criada com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade ou safra não encontrada' })
  async create(@Body() dto: CreateProducerCropInputDTO) {
    return this.createProducerCropService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar culturas plantadas' })
  @ApiResponse({ status: 200, description: 'Lista paginada de culturas plantadas' })
  async list(@Query() dto: ListProducerCropInputDTO) {
    return this.listProducerCropService.execute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cultura plantada por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cultura plantada encontrada' })
  @ApiResponse({ status: 404, description: 'Cultura plantada não encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getProducerCropService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cultura plantada' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Cultura plantada atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Cultura plantada não encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProducerCropInputDTO,
  ) {
    return this.updateProducerCropService.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover cultura plantada' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Cultura plantada removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Cultura plantada não encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteProducerCropService.execute(id);
  }
}

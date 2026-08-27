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
import { CreatePropertyService } from './services/create-property/create-property.service';
import { ListPropertiesService } from './services/list-properties/list-properties.service';
import { GetPropertyService } from './services/get-property/get-property.service';
import { UpdatePropertyService } from './services/update-property/update-property.service';
import { DeletePropertyService } from './services/delete-property/delete-property.service';
import { CreatePropertyInputDTO } from './dtos/create-property-input.dto';
import { UpdatePropertyInputDTO } from './dtos/update-property-input.dto';
import { PaginationInputDTO } from '../shared/dtos/pagination-input.dto';
import { ListPropertiesFilters } from './filters/list-properties.filters';

@ApiTags('Propriedades Rurais')
@ApiBearerAuth()
@Controller('rural-property')
export class RuralPropertyController {
  constructor(
    private readonly createPropertyService: CreatePropertyService,
    private readonly listPropertiesService: ListPropertiesService,
    private readonly getPropertyService: GetPropertyService,
    private readonly updatePropertyService: UpdatePropertyService,
    private readonly deletePropertyService: DeletePropertyService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar nova propriedade rural' })
  @ApiResponse({ status: 201, description: 'Propriedade criada com sucesso' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async create(@Body() dto: CreatePropertyInputDTO) {
    return this.createPropertyService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar propriedades rurais' })
  @ApiResponse({ status: 200, description: 'Lista paginada de propriedades' })
  async list(@Query() pagination: PaginationInputDTO, @Query('producerId') producerId?: string) {
    const filters: ListPropertiesFilters | undefined = producerId ? { producerId } : undefined;
    return this.listPropertiesService.execute(pagination, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar propriedade rural por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Propriedade encontrada' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getPropertyService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar propriedade rural' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Propriedade atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePropertyInputDTO,
  ) {
    return this.updatePropertyService.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover propriedade rural' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Propriedade removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deletePropertyService.execute(id);
  }
}

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
import { CreateHarvestService } from '@/harvest/services/create-harvest/create-harvest.service';
import { ListHarvestsService } from '@/harvest/services/list-harvests/list-harvests.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { UpdateHarvestService } from '@/harvest/services/update-harvest/update-harvest.service';
import { DeleteHarvestService } from '@/harvest/services/delete-harvest/delete-harvest.service';
import { CreateHarvestInputDTO } from '@/harvest/dtos/create-harvest-input.dto';
import { UpdateHarvestInputDTO } from '@/harvest/dtos/update-harvest-input.dto';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';

@ApiTags('Safras')
@ApiBearerAuth()
@Controller('harvest')
export class HarvestController {
  constructor(
    private readonly createHarvestService: CreateHarvestService,
    private readonly listHarvestsService: ListHarvestsService,
    private readonly getHarvestService: GetHarvestService,
    private readonly updateHarvestService: UpdateHarvestService,
    private readonly deleteHarvestService: DeleteHarvestService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar nova safra' })
  @ApiResponse({ status: 201, description: 'Safra criada com sucesso' })
  async create(@Body() dto: CreateHarvestInputDTO) {
    return this.createHarvestService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar safras' })
  @ApiResponse({ status: 200, description: 'Lista paginada de safras' })
  async list(@Query() pagination: PaginationInputDTO) {
    return this.listHarvestsService.execute(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar safra por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Safra encontrada' })
  @ApiResponse({ status: 404, description: 'Safra não encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getHarvestService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar safra' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Safra atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Safra não encontrada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHarvestInputDTO,
  ) {
    return this.updateHarvestService.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover safra' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Safra removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Safra não encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteHarvestService.execute(id);
  }
}

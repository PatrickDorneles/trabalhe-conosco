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
import { CreateProducerService } from './services/create-producer/create-producer.service';
import { ListProducersService } from './services/list-producers/list-producers.service';
import { GetProducerService } from './services/get-producer/get-producer.service';
import { UpdateProducerService } from './services/update-producer/update-producer.service';
import { DeleteProducerService } from './services/delete-producer/delete-producer.service';
import { CreateProducerInputDTO } from './dtos/create-producer-input.dto';
import { UpdateProducerInputDTO } from './dtos/update-producer-input.dto';
import { ProducerOutput } from './dtos/producer-output.dto';
import { PaginationInputDTO } from '../shared/dtos/pagination-input.dto';
import { PaginationOutputDTO } from '../shared/dtos/pagination-output.dto';

@ApiTags('Produtores')
@ApiBearerAuth()
@Controller('producers')
export class ProducersController {
  constructor(
    private readonly createProducerService: CreateProducerService,
    private readonly listProducersService: ListProducersService,
    private readonly getProducerService: GetProducerService,
    private readonly updateProducerService: UpdateProducerService,
    private readonly deleteProducerService: DeleteProducerService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo produtor' })
  @ApiResponse({ status: 201, description: 'Produtor criado com sucesso', type: ProducerOutput })
  @ApiResponse({ status: 409, description: 'CPF/CNPJ já cadastrado' })
  async create(@Body() dto: CreateProducerInputDTO): Promise<ProducerOutput> {
    return this.createProducerService.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produtores' })
  @ApiResponse({ status: 200, description: 'Lista paginada de produtores' })
  async list(@Query() pagination: PaginationInputDTO) {
    return this.listProducersService.execute(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produtor por ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Produtor encontrado', type: ProducerOutput })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getProducerService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produtor' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Produtor atualizado com sucesso', type: ProducerOutput })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProducerInputDTO,
  ) {
    return this.updateProducerService.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover produtor' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Produtor removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteProducerService.execute(id);
  }
}

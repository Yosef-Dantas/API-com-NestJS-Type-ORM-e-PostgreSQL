import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DadosMedicosService } from './dados-medicos.service';
import { CreateDadosMedicoDto } from './dto/create-dados-medico.dto';
import { UpdateDadosMedicoDto } from './dto/update-dados-medico.dto';
import { DadosMedicos } from './entities/dados-medico.entity';

@Controller('dados-medicos')
export class DadosMedicosController {
  constructor(private readonly dadosMedicosService: DadosMedicosService) {}

  @Post()
  create(
    @Body() createDadosMedicoDto: CreateDadosMedicoDto,
  ): Promise<DadosMedicos> {
    return this.dadosMedicosService.create(createDadosMedicoDto);
  }

  @Get()
  findAll(): Promise<DadosMedicos[]> {
    return this.dadosMedicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DadosMedicos> {
    return this.dadosMedicosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDadosMedicoDto: UpdateDadosMedicoDto,
  ): Promise<DadosMedicos> {
    return this.dadosMedicosService.update(id, updateDadosMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dadosMedicosService.remove(id);
  }
}

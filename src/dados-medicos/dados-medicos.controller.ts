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

@Controller('dados-medicos')
export class DadosMedicosController {
  constructor(private readonly dadosMedicosService: DadosMedicosService) {}

  @Post()
  create(@Body() createDadosMedicoDto: CreateDadosMedicoDto) {
    return this.dadosMedicosService.create(createDadosMedicoDto);
  }

  @Get()
  findAll() {
    return this.dadosMedicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dadosMedicosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDadosMedicoDto: UpdateDadosMedicoDto,
  ) {
    return this.dadosMedicosService.update(id, updateDadosMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dadosMedicosService.remove(id);
  }
}

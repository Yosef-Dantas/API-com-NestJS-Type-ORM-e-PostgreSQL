import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TitulosService } from './titulos.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Titulo } from './entities/titulo.entity';

@Controller('titulos')
export class TitulosController {
  constructor(private readonly titulosService: TitulosService) {}

  @Post()
  create(@Body() createTituloDto: CreateTituloDto): Promise<Titulo> {
    return this.titulosService.create(createTituloDto);
  }

  @Get()
  findAll(): Promise<Titulo[]> {
    return this.titulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Titulo> {
    return this.titulosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTituloDto: UpdateTituloDto,
  ): Promise<Titulo> {
    return this.titulosService.update(id, updateTituloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titulosService.remove(id);
  }
}

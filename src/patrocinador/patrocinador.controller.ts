import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatrocinadorService } from './patrocinador.service';
import { CreatePatrocinadorDto } from './dto/create-patrocinador.dto';
import { UpdatePatrocinadorDto } from './dto/update-patrocinador.dto';
import { Patrocinador } from './entities/patrocinador.entity';

@Controller('patrocinador')
export class PatrocinadorController {
  constructor(private readonly patrocinadorService: PatrocinadorService) {}

  @Post()
  create(
    @Body() createPatrocinadorDto: CreatePatrocinadorDto,
  ): Promise<Patrocinador> {
    return this.patrocinadorService.create(createPatrocinadorDto);
  }

  @Get()
  findAll(): Promise<Patrocinador[]> {
    return this.patrocinadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Patrocinador> {
    return this.patrocinadorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatrocinadorDto: UpdatePatrocinadorDto,
  ): Promise<Patrocinador> {
    return this.patrocinadorService.update(id, updatePatrocinadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patrocinadorService.remove(id);
  }
}

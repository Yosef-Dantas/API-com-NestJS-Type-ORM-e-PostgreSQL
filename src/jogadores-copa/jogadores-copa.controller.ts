import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JogadoresCopaService } from './jogadores-copa.service';
import { CreateJogadoresCopaDto } from './dto/create-jogadores-copa.dto';
import { UpdateJogadoresCopaDto } from './dto/update-jogadores-copa.dto';
import { JogadoresCopa } from './entities/jogadores-copa.entity';

@Controller('jogadores-copa')
export class JogadoresCopaController {
  constructor(private readonly jogadoresCopaService: JogadoresCopaService) {}

  @Post()
  create(
    @Body() createJogadoresCopaDto: CreateJogadoresCopaDto,
  ): Promise<JogadoresCopa> {
    return this.jogadoresCopaService.create(createJogadoresCopaDto);
  }

  @Get()
  findAll(): Promise<JogadoresCopa[]> {
    return this.jogadoresCopaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<JogadoresCopa> {
    return this.jogadoresCopaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJogadoresCopaDto: UpdateJogadoresCopaDto,
  ): Promise<JogadoresCopa> {
    return this.jogadoresCopaService.update(id, updateJogadoresCopaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogadoresCopaService.remove(id);
  }
}

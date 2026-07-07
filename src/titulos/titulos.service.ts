import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Titulo } from './entities/titulo.entity';
import { Repository } from 'typeorm';
import { ErrorTextEum } from '../shared/enums/errors-text.enum';

@Injectable()
export class TitulosService {
  constructor(
    @InjectRepository(Titulo)
    private readonly tituloRepository: Repository<Titulo>,
  ) {}
  async create(createTituloDto: CreateTituloDto): Promise<Titulo> {
    const novoTitulo = this.tituloRepository.create({
      ...createTituloDto,
      jogador: { id: createTituloDto.jogadorId },
    });

    return await this.tituloRepository.save(novoTitulo);
  }

  async findAll(): Promise<Titulo[]> {
    // 1. Busca todos os títulos do banco de dados (sem filtro de ID)
    const titulos = await this.tituloRepository.find();

    // 2. Conferência: Se a lista estiver vazia (tamanho zero), lança o erro
    if (titulos.length === 0) {
      throw new NotFoundException(ErrorTextEum.TITLES_NOT_FOUND);
    }

    // 3. Retorna a lista completa
    return titulos;
  }

  async findOne(id: string): Promise<Titulo> {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException(ErrorTextEum.TITLE_NOT_FOUND);
    }
    return titulo;
  }

  async update(id: string, updateTituloDto: UpdateTituloDto): Promise<Titulo> {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException(ErrorTextEum.TITLE_NOT_FOUND);
    }

    await this.tituloRepository.update(id, updateTituloDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException(ErrorTextEum.TITLE_NOT_FOUND);
    }

    await this.tituloRepository.delete(id);
  }
}

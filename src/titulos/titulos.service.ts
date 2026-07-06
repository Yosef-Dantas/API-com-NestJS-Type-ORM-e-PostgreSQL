import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Titulo } from './entities/titulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TitulosService {
  constructor(
    @InjectRepository(Titulo)
    private readonly tituloRepository: Repository<Titulo>,
  ) {}
  async create(createTituloDto: CreateTituloDto) {
    const novoTitulo = this.tituloRepository.create({
      nome_do_titulo: createTituloDto.nome_do_titulo,
      categoria_do_titulo: createTituloDto.categoria_do_titulo,
      ano: createTituloDto.ano,
      // Embutindo o ID direto no formato { id } para forjar a Chave Estrangeira sem precisar fazer uma busca prévia no banco.
      jogador: { id: createTituloDto.jogadorId },
    });

    return await this.tituloRepository.save(novoTitulo);
  }

  async findAll() {
    return await this.tituloRepository.find();
  }

  async findOne(id: string) {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException('Título não encontrado.');
    }
    return titulo;
  }

  async update(id: string, updateTituloDto: UpdateTituloDto) {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException('Título não encontrado.');
    }

    await this.tituloRepository.update(id, updateTituloDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const titulo = await this.tituloRepository.findOneBy({ id });

    if (!titulo) {
      throw new NotFoundException('Título não encontrado.');
    }

    await this.tituloRepository.delete(id);
  }
}

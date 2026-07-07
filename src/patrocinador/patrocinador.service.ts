import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatrocinadorDto } from './dto/create-patrocinador.dto';
import { UpdatePatrocinadorDto } from './dto/update-patrocinador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patrocinador } from './entities/patrocinador.entity';
import { Repository } from 'typeorm';
import { ErrorTextEum } from '../shared/enums/errors-text.enum';

@Injectable()
export class PatrocinadorService {
  constructor(
    @InjectRepository(Patrocinador)
    private readonly patrocinadorRepository: Repository<Patrocinador>,
  ) {}

  async create(
    createPatrocinadorDto: CreatePatrocinadorDto,
  ): Promise<Patrocinador> {
    const listaDeJogadores =
      createPatrocinadorDto.jogadoresIds?.map((idDoJogador) => ({
        id: idDoJogador,
      })) || [];
    const novoPatrocinador = this.patrocinadorRepository.create({
      ...createPatrocinadorDto,
      jogadores: listaDeJogadores,
    });
    return await this.patrocinadorRepository.save(novoPatrocinador);
  }

  async findAll(): Promise<Patrocinador[]> {
    // 1. Busca todos os títulos do banco de dados (sem filtro de ID)
    const patrocinadores = await this.patrocinadorRepository.find();

    // 2. Conferência: Se a lista estiver vazia (tamanho zero), lança o erro
    if (patrocinadores.length === 0) {
      throw new NotFoundException(ErrorTextEum.SPONSORS_NOT_FOUND);
    }

    // 3. Retorna a lista completa
    return patrocinadores;
  }

  async findOne(id: string): Promise<Patrocinador> {
    const patrocinador = await this.patrocinadorRepository.findOneBy({
      id,
    });

    if (!patrocinador) {
      throw new NotFoundException(ErrorTextEum.SPONSOR_NOT_FOUND);
    }

    return patrocinador;
  }

  async update(
    id: string,
    updatePatrocinadorDto: UpdatePatrocinadorDto,
  ): Promise<Patrocinador> {
    const patrocinador = await this.patrocinadorRepository.findOneBy({ id });

    if (!patrocinador) {
      throw new NotFoundException(ErrorTextEum.SPONSOR_NOT_FOUND);
    }

    await this.patrocinadorRepository.update(id, updatePatrocinadorDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const patrocinador = await this.patrocinadorRepository.findOneBy({ id });

    if (!patrocinador) {
      throw new NotFoundException(ErrorTextEum.SPONSOR_NOT_FOUND);
    }

    await this.patrocinadorRepository.delete(id);
  }
}

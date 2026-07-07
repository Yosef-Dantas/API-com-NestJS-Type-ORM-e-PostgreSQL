import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJogadoresCopaDto } from './dto/create-jogadores-copa.dto';
import { UpdateJogadoresCopaDto } from './dto/update-jogadores-copa.dto';
import { JogadoresCopa } from './entities/jogadores-copa.entity';
import { Repository } from 'typeorm';
import { ErrorTextEum } from '../shared/enums/errors-text.enum';

@Injectable()
export class JogadoresCopaService {
  // Injetando o controle do banco de dados para a entidade JogadoresCopa.
  constructor(
    @InjectRepository(JogadoresCopa)
    private readonly jogadoresRepository: Repository<JogadoresCopa>,
  ) {}
  async create(
    createJogadoresCopaDto: CreateJogadoresCopaDto,
  ): Promise<JogadoresCopa> {
    // Preparando o objeto na memória, mas ainda não foi enviado para o banco de dados.
    const novoJogador = this.jogadoresRepository.create(createJogadoresCopaDto);

    // Salvando efetivamente no banco de dados.
    return await this.jogadoresRepository.save(novoJogador);
  }

  // Busca e retorna todos os registros existentes na tabela.
  async findAll(): Promise<JogadoresCopa[]> {
    // 1. Busca todos os títulos do banco de dados (sem filtro de ID)
    const jogadores = await this.jogadoresRepository.find();

    // 2. Conferência: Se a lista estiver vazia (tamanho zero), lança o erro
    if (jogadores.length === 0) {
      throw new NotFoundException(ErrorTextEum.PLAYERS_NOT_FOUND);
    }

    // 3. Retorna a lista completa
    return jogadores;
  }

  // Busca e retorna apenas um jogador específico baseado no seu identificador
  async findOne(id: string): Promise<JogadoresCopa> {
    // Busca o jogador pelo id.
    // O bloco 'relations' faz os JOINs automáticos para puxar as peças conectadas junto com o registro principal.
    const jogador = await this.jogadoresRepository.findOne({
      where: { id },
      relations: {
        titulos: true,
        patrocinadores: true,
      },
    });

    if (!jogador) {
      throw new NotFoundException(ErrorTextEum.PLAYER_NOT_FOUND);
    }
    return jogador;
  }

  async update(
    id: string,
    updateJogadoresCopaDto: UpdateJogadoresCopaDto,
  ): Promise<JogadoresCopa> {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException(ErrorTextEum.PLAYER_NOT_FOUND);
    }

    await this.jogadoresRepository.update(id, updateJogadoresCopaDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException(ErrorTextEum.PLAYER_NOT_FOUND);
    }

    await this.jogadoresRepository.delete(id);
  }
}

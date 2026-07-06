import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJogadoresCopaDto } from './dto/create-jogadores-copa.dto';
import { UpdateJogadoresCopaDto } from './dto/update-jogadores-copa.dto';
import { JogadoresCopa } from './entities/jogadores-copa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JogadoresCopaService {
  // Injetando o controle do banco de dados para a entidade JogadoresCopa.
  constructor(
    @InjectRepository(JogadoresCopa)
    private readonly jogadoresRepository: Repository<JogadoresCopa>,
  ) {}
  async create(createJogadoresCopaDto: CreateJogadoresCopaDto) {
    // Preparando o objeto na memória, mas ainda não foi enviado para o banco de dados.
    const novoJogador = this.jogadoresRepository.create(createJogadoresCopaDto);

    // Salvando efetivamente no banco de dados.
    return await this.jogadoresRepository.save(novoJogador);
  }

  // Busca e retorna todos os registros existentes na tabela.
  async findAll() {
    return await this.jogadoresRepository.find();
  }

  // Busca e retorna apenas um jogador específico baseado no seu identificador
  async findOne(id: string) {
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
      throw new NotFoundException('Jogador não encontrado.');
    }
    return jogador;
  }

  async update(id: string, updateJogadoresCopaDto: UpdateJogadoresCopaDto) {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    await this.jogadoresRepository.update(id, updateJogadoresCopaDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const jogador = await this.jogadoresRepository.findOneBy({ id });

    if (!jogador) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    await this.jogadoresRepository.delete(id);
  }
}

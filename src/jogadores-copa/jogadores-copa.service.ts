import { Injectable } from '@nestjs/common';
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
    private readonly jogadoresRepository: Repository<JogadoresCopa>
  ){}
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
  async findOne(id: number) {
    return await this.jogadoresRepository.findOneBy({id});
  }

  async update(id: number, updateJogadoresCopaDto: UpdateJogadoresCopaDto) {
    await this.jogadoresRepository.update(id, updateJogadoresCopaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.jogadoresRepository.delete(id);
    return {deletado: true};
  }
}

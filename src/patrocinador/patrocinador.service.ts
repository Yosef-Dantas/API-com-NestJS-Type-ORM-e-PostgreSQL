import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatrocinadorDto } from './dto/create-patrocinador.dto';
import { UpdatePatrocinadorDto } from './dto/update-patrocinador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patrocinador } from './entities/patrocinador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatrocinadorService {
  constructor(
    @InjectRepository(Patrocinador)
    private readonly patrocinadorRepository: Repository<Patrocinador>,
  ) {}

  async create(createPatrocinadorDto: CreatePatrocinadorDto) {
    const novoPatrocinador = this.patrocinadorRepository.create({
      // Monta o "chassi" do objeto na memória RAM com os dados validados antes de acionar o banco,montagem guiada para evitar a entrada de qualquer dado indesejado ou perca de dados.
      nome_da_marca: createPatrocinadorDto.nome_da_marca,
      ramo_de_atividade: createPatrocinadorDto.ramo_de_atividade,
      valor: createPatrocinadorDto.valor,
      data_de_expiracao: createPatrocinadorDto.data_de_expiracao,
      // Converte o array de textos ["id1"] no formato de objetos [{id: "id1"}] exigido pelo TypeORM para não dar o erro de amarração.
      jogadores: createPatrocinadorDto.jogadoresIds.map((id) => ({ id })),
    });
    return await this.patrocinadorRepository.save(novoPatrocinador);
  }

  async findAll() {
    return await this.patrocinadorRepository.find();
  }

  async findOne(id: string) {
    const patrocinador = await this.patrocinadorRepository.findOneBy({ id });

    if (!patrocinador) {
      throw new NotFoundException('Patrocinador não encontrado.');
    }

    return patrocinador;
  }

  async update(id: string, updatePatrocinadorDto: UpdatePatrocinadorDto) {
    const patrocinador = await this.patrocinadorRepository.findOneBy({ id });

    if (!patrocinador) {
      throw new NotFoundException('Patrocinador não encontrado.');
    }

    await this.patrocinadorRepository.update(id, updatePatrocinadorDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const patrocinador = await this.patrocinadorRepository.findOneBy({ id });

    if (!patrocinador) {
      throw new NotFoundException('Patrocinador não encontrado.');
    }

    await this.patrocinadorRepository.delete(id);
  }
}

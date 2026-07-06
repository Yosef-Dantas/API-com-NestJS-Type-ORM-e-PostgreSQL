import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDadosMedicoDto } from './dto/create-dados-medico.dto';
import { UpdateDadosMedicoDto } from './dto/update-dados-medico.dto';
import { DadosMedicos } from './entities/dados-medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DadosMedicosService {
  constructor(
    @InjectRepository(DadosMedicos)
    private readonly DadosMedicosRepository: Repository<DadosMedicos>,
  ) {}
  async create(createDadosMedicoDto: CreateDadosMedicoDto) {
    const novoDadosMedicos =
      this.DadosMedicosRepository.create(createDadosMedicoDto);

    return await this.DadosMedicosRepository.save(novoDadosMedicos);
  }

  async findAll() {
    return await this.DadosMedicosRepository.find();
  }

  async findOne(id: string) {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException('Dados Médicos não encontrado.');
    }
    return dados_medicos;
  }

  async update(id: string, updateDadosMedicoDto: UpdateDadosMedicoDto) {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException('Dados Médicos não encontrados.');
    }

    await this.DadosMedicosRepository.update(id, updateDadosMedicoDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException('Dados Médicos não encontrados.');
    }

    await this.DadosMedicosRepository.delete(id);
  }
}

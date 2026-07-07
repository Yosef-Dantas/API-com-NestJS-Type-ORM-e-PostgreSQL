import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDadosMedicoDto } from './dto/create-dados-medico.dto';
import { UpdateDadosMedicoDto } from './dto/update-dados-medico.dto';
import { DadosMedicos } from './entities/dados-medico.entity';
import { Repository } from 'typeorm';
import { ErrorTextEum } from '../shared/enums/errors-text.enum';

@Injectable()
export class DadosMedicosService {
  constructor(
    @InjectRepository(DadosMedicos)
    private readonly DadosMedicosRepository: Repository<DadosMedicos>,
  ) {}
  async create(
    createDadosMedicoDto: CreateDadosMedicoDto,
  ): Promise<DadosMedicos> {
    const novoDadosMedicos =
      this.DadosMedicosRepository.create(createDadosMedicoDto);

    return await this.DadosMedicosRepository.save(novoDadosMedicos);
  }

  async findAll(): Promise<DadosMedicos[]> {
    // 1. Busca todos os títulos do banco de dados (sem filtro de ID)
    const DadosMedicos = await this.DadosMedicosRepository.find();

    // 2. Conferência: Se a lista estiver vazia (tamanho zero), lança o erro
    if (DadosMedicos.length === 0) {
      throw new NotFoundException(ErrorTextEum.MEDICALS_HISTORY_NOT_FOUND);
    }

    // 3. Retorna a lista completa
    return DadosMedicos;
  }

  async findOne(id: string): Promise<DadosMedicos> {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException(ErrorTextEum.MEDICAL_HISTORY_NOT_FOUND);
    }
    return dados_medicos;
  }

  async update(
    id: string,
    updateDadosMedicoDto: UpdateDadosMedicoDto,
  ): Promise<DadosMedicos> {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException(ErrorTextEum.MEDICAL_HISTORY_NOT_FOUND);
    }

    await this.DadosMedicosRepository.update(id, updateDadosMedicoDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const dados_medicos = await this.DadosMedicosRepository.findOneBy({ id });

    if (!dados_medicos) {
      throw new NotFoundException(ErrorTextEum.MEDICAL_HISTORY_NOT_FOUND);
    }

    await this.DadosMedicosRepository.delete(id);
  }
}

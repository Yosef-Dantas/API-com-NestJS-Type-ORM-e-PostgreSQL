import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDadosMedicoDto } from '../../dados-medicos/dto/create-dados-medico.dto';

// DTO responsável por definir e validar os dados necessários para o cadastro de um jogador da Copa.
export class CreateJogadoresCopaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  posicao!: string;

  @IsInt()
  @IsNotEmpty()
  idade!: number;

  @IsInt()
  @IsNotEmpty()
  numeroDaCamisa!: number;

  @IsInt()
  @IsOptional()
  jogos!: number;

  @IsInt()
  @IsOptional()
  gols!: number;

  @IsInt()
  @IsOptional()
  assistencias!: number;

  @IsString()
  @IsNotEmpty()
  nacionalidade!: string;

  @IsString()
  @IsOptional()
  clube!: string;

  @IsInt()
  @IsOptional()
  valor!: number;

  @IsString()
  @IsOptional()
  moeda!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDadosMedicoDto)
  dadosMedicos!: CreateDadosMedicoDto;
}

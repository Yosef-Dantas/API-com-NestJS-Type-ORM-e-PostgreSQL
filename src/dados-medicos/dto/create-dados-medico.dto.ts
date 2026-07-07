import {
  IsPositive,
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
// DTO responsável por definir e validar os dados necessários para o cadastro de dados médicos de um jogador.
export class CreateDadosMedicoDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  altura!: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  peso!: number;

  @IsString()
  @IsNotEmpty()
  atributosFisicos!: string;

  @IsString()
  @IsNotEmpty()
  aspectosPsicologicos!: string;

  @IsInt()
  @IsOptional()
  anosJogados!: number;

  @IsInt()
  @IsOptional()
  numeroDeLesoes!: number;

  @IsString()
  @IsOptional()
  status!: string;

  @IsInt()
  @IsOptional()
  diasParaRetorno!: number;
}

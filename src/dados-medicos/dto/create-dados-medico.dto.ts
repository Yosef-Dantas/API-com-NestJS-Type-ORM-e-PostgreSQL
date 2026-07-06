import {
  IsPositive,
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
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
  atributos_fisicos!: string;

  @IsString()
  @IsNotEmpty()
  aspectos_psicologicos!: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Limpeza simples para extrair apenas o número de anos jogados (ex: "3 anos" vira 3)
      const apenasNumerosEPonto = value
        .replace(/[^\d.,]/g, '')
        .replace(',', '.');
      const numeroBase = parseFloat(apenasNumerosEPonto);
      return isNaN(numeroBase) ? 0 : Math.round(numeroBase);
    }
    return Number(value);
  })
  @IsInt()
  @IsOptional()
  anos_jogados!: number;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Limpeza simples: extrai apenas o número de lesões (ex: "3 lesões" vira 3)
      const apenasNumerosEPonto = value
        .replace(/[^\d.,]/g, '')
        .replace(',', '.');
      const numeroBase = parseFloat(apenasNumerosEPonto);
      return isNaN(numeroBase) ? 0 : Math.round(numeroBase);
    }
    return Number(value);
  })
  @IsInt()
  @IsOptional()
  numero_de_lesoes!: number;

  @IsString()
  @IsOptional()
  status!: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Convertendo tudo para minúsculo para facilitar a busca
      const textoMinusculo = value.toLowerCase();

      // Extraindo apenas os números (mantendo pontos e vírgulas para casos como "1,5 meses")
      const apenasNumerosEPonto = textoMinusculo
        .replace(/[^\d.,]/g, '')
        .replace(',', '.');

      const numeroBase = parseFloat(apenasNumerosEPonto);

      // Trava de segurança: se a pessoa mandar só texto ("desconhecido"), retorna 0
      if (isNaN(numeroBase)) return 0;

      // Passando pelas esteiras de conversão (arredondando com Math.round para não ter "dias quebrados")
      if (textoMinusculo.includes('ano')) {
        return Math.round(numeroBase * 365); // Converte anos para dias
      }

      if (textoMinusculo.includes('mes') || textoMinusculo.includes('mês')) {
        return Math.round(numeroBase * 30); // Converte meses para dias
      }

      if (textoMinusculo.includes('semana')) {
        return Math.round(numeroBase * 7); // Converte semanas para dias
      }

      // Se a pessoa digitar "15 dias" ou apenas "15" (sem unidade), cai na regra padrão
      return Math.round(numeroBase);
    }

    // Se já chegou como número puro pelo JSON, passa direto
    return Number(value);
  })
  @IsInt()
  @IsOptional()
  tempo_para_retorno!: number;
}

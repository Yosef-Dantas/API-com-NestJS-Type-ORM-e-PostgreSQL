import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsArray,
  IsUUID,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
// DTO responsável por definir e validar os dados necessários para o cadastro de um patrocinador.
export class CreatePatrocinadorDto {
  @IsString()
  @IsNotEmpty()
  nome_da_marca!: string;

  @IsString()
  @IsNotEmpty()
  ramo_de_atividade!: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const textoMinusculo = value.toLowerCase();

      if (
        textoMinusculo.includes('milhão') ||
        textoMinusculo.includes('milhões')
      ) {
        const apenasNumerosEPonto = textoMinusculo
          .replace(/[^\d.,]/g, '')
          .replace(',', '.');
        const numeroBase = parseFloat(apenasNumerosEPonto);
        return numeroBase * 1000000;
      }
      const apenasNumeros = textoMinusculo.replace(/\D/g, '');
      return parseInt(apenasNumeros, 10);
    }
    return Number(value);
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  valor!: number;

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
  @IsPositive()
  @IsOptional()
  data_de_expiracao!: number;
  //Exige que seja enviado uma lista (array).
  @IsArray()
  // Varre a lista e garante que todos os itens sejam UUIDs legítimos, bloqueando IDs falsos.
  @IsUUID('4', { each: true })
  jogadoresIds!: string[];
}

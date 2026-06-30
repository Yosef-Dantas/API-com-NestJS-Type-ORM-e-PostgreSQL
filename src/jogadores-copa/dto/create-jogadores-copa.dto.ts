import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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
  numero_da_camisa!: number;

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

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // convertendo tudo para minúsculo para facilitar a busca.
      const textoMinusculo = value.toLowerCase();

      // verificamos se existe a palavra milhão
      if (
        textoMinusculo.includes('milhão') ||
        textoMinusculo.includes('milhões')
      ) {
        // removendo letras soltas, mas mantendo os números, pontos e vírgulas.
        const apenasNumerosEPonto = textoMinusculo
          .replace(/[^\d.,]/g, '')
          .replace(',', '.');
        const numeroBase = parseFloat(apenasNumerosEPonto);
        return numeroBase * 1000000;
      }

      // se não tiver a palavra milhão, ele cai na limpeza padrão.
      const apenasNumeros = textoMinusculo.replace(/\D/g, '');
      return parseInt(apenasNumeros, 10);
    }

    // Se já chegou como número puro, passa direto
    return value;
  })
  @IsInt()
  @IsOptional()
  valor!: number;

  @IsString()
  @IsOptional()
  moeda!: string;
}

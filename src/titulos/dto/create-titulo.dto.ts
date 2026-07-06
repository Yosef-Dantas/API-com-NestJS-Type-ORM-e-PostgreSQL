import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
// DTO responsável por definir e validar os dados necessários para o cadastro de um título.
export class CreateTituloDto {
  @IsString()
  @IsNotEmpty()
  nome_do_titulo!: string;

  @IsString()
  @IsNotEmpty()
  categoria_do_titulo!: string;

  @IsInt()
  @IsOptional()
  ano!: number;

  @IsUUID()
  @IsNotEmpty()
  jogadorId!: string;
}

import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
// DTO responsável por definir e validar os dados necessários para o cadastro de um título.
export class CreateTituloDto {
  @IsString()
  @IsNotEmpty()
  nomeDoTitulo!: string;

  @IsString()
  @IsNotEmpty()
  categoriaDoTitulo!: string;

  @IsOptional()
  ano!: number;

  @IsUUID()
  @IsNotEmpty()
  jogadorId!: string;
}

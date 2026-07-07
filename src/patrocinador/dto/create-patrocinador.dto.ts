import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsUUID,
  IsOptional,
  IsInt,
} from 'class-validator';

// DTO responsável por definir e validar os dados necessários para o cadastro de um patrocinador.
export class CreatePatrocinadorDto {
  @IsString()
  @IsNotEmpty()
  nomeDaMarca!: string;

  @IsString()
  @IsNotEmpty()
  ramoDeAtividade!: string;

  @IsOptional()
  @IsInt()
  valorEmMilhoes!: number;

  @IsOptional()
  @IsInt()
  anoDeExpiracao!: number;
  //Exige que seja enviado uma lista (array).
  @IsArray()
  // Varre a lista e garante que todos os itens sejam UUIDs legítimos, bloqueando IDs falsos.
  @IsUUID('4', { each: true })
  jogadoresIds!: string[];
}

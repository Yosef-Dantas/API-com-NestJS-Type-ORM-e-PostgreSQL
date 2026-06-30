import { PartialType } from '@nestjs/swagger';
import { CreateJogadoresCopaDto } from './create-jogadores-copa.dto';

export class UpdateJogadoresCopaDto extends PartialType(
  CreateJogadoresCopaDto,
) {}

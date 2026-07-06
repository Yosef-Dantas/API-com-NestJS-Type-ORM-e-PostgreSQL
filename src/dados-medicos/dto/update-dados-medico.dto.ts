import { PartialType } from '@nestjs/swagger';
import { CreateDadosMedicoDto } from './create-dados-medico.dto';

export class UpdateDadosMedicoDto extends PartialType(CreateDadosMedicoDto) {}

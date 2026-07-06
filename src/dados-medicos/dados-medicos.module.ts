import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosMedicosService } from './dados-medicos.service';
import { DadosMedicosController } from './dados-medicos.controller';
import { DadosMedicos } from './entities/dados-medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DadosMedicos])],
  controllers: [DadosMedicosController],
  providers: [DadosMedicosService],
})
export class DadosMedicosModule {}

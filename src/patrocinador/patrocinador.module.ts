import { Module } from '@nestjs/common';
import { PatrocinadorService } from './patrocinador.service';
import { PatrocinadorController } from './patrocinador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patrocinador } from './entities/patrocinador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patrocinador])],
  controllers: [PatrocinadorController],
  providers: [PatrocinadorService],
})
export class PatrocinadorModule {}

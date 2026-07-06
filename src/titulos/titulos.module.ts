import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitulosService } from './titulos.service';
import { TitulosController } from './titulos.controller';
import { Titulo } from './entities/titulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Titulo])],
  controllers: [TitulosController],
  providers: [TitulosService],
})
export class TitulosModule {}

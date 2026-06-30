import { Module } from '@nestjs/common';
import { JogadoresCopaService } from './jogadores-copa.service';
import { JogadoresCopaController } from './jogadores-copa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogadoresCopa } from './entities/jogadores-copa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JogadoresCopa])],
  controllers: [JogadoresCopaController],
  providers: [JogadoresCopaService],
})
export class JogadoresCopaModule {}

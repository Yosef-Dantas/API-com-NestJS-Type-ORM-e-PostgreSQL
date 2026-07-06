import { Entity, Column, OneToOne, Check } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
// O import do Jogador vai ficar vermelho até a gente criar a relação do outro lado, é normal!
import { JogadoresCopa } from '../../jogadores-copa/entities/jogadores-copa.entity';

@Entity('dados_medicos')
// Adicinando uma checagem para impedir valores negativos.
@Check('chk_dados_fisicos_validos', '"altura" > 0 AND "peso" > 0 ')
export class DadosMedicos extends BaseEntity {
  // Precision diz o tamanho e o scale diz quantos números podem após  a ','.
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  altura!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  peso!: number;

  @Column({ type: 'text' })
  atributos_fisicos!: string;

  @Column({ type: 'text' })
  aspectos_psicologicos!: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  anos_jogados!: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  numero_de_lesoes!: number;

  @Column({ type: 'text', nullable: true })
  status!: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  tempo_para_retorno!: number;

  // Conexão que liga a tabela dos dados médicos à tabela do jogador.
  @OneToOne(() => JogadoresCopa, (jogador) => jogador.dadosMedicos)
  jogador!: JogadoresCopa;
}

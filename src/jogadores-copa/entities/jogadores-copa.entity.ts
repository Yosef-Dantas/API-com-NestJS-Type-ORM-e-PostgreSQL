import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { DadosMedicos } from '../../dados-medicos/entities/dados-medico.entity';
import { Titulo } from '../../titulos/entities/titulo.entity';
import { Patrocinador } from '../../patrocinador/entities/patrocinador.entity';

// Avisando ao banco o nome da tabela
@Entity('jogadores_copa')
export class JogadoresCopa extends BaseEntity {
  // Transforma a variável logo abaixo dela em uma coluna comum da tabela.
  @Column({ length: 40 })
  // Afirmação de Atribuição Definitiva(!), além de algumas condições necessárias para preencimento da tabela.
  nome!: string;

  @Column({ length: 20 })
  posicao!: string;

  @Column('int')
  idade!: number;

  @Column({ type: 'int', default: 0 })
  numero_da_camisa!: number;

  @Column({ type: 'int', default: 0 })
  jogos!: number;

  @Column({ type: 'int', default: 0 })
  gols!: number;

  @Column({ type: 'int', default: 0 })
  assistencias!: number;

  @Column({ length: 20 })
  nacionalidade!: string;

  @Column({ nullable: true })
  clube!: string;

  @Column({ nullable: true })
  valor!: number;

  @Column({ length: 3, default: 'EUR' })
  moeda!: string;

  //'cascade' permite criar a ficha junto com o jogador, 'eager' permite puxar esses dados nas buscas, e 'onDelete' destrói a ficha se o jogador for deletado.
  @OneToOne(() => DadosMedicos, (dados) => dados.jogador, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  // O '@JoinColumn' crava a chave estrangeira nesta tabela.
  @JoinColumn()
  dadosMedicos!: DadosMedicos;
  //O 'cascade: false' indica que a criação e gestão dos títulos são feitas em rotas independentes.
  @OneToMany(() => Titulo, (titulo) => titulo.jogador, {
    cascade: false,
  })
  titulos!: Titulo[];
  //O @JoinTable cria a tabela oculta que cruza múltiplos jogadores com múltiplos patrocinadores.
  @ManyToMany(() => Patrocinador, (patrocinador) => patrocinador.jogadores)
  @JoinTable()
  patrocinadores!: Patrocinador[];
}

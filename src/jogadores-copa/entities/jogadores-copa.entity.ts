import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Avisando ao banco o nome da tabela
@Entity('jogadores_copa')
export class JogadoresCopa {
  // Cria a coluna de ID e gera a numeração automaticamente.
  @PrimaryGeneratedColumn()
  id!: number;
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

  // Anota a data e a hora que foi criado.
  @CreateDateColumn()
  createdAt!: Date;

  // Atualiza a data e a hora que foi atualizado.
  @UpdateDateColumn()
  updatedAt!: Date;
}

import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { JogadoresCopa } from '../../jogadores-copa/entities/jogadores-copa.entity';

@Entity('titulos')
export class Titulo extends BaseEntity {
  @Column({ type: 'text' })
  nome_do_titulo!: string;

  @Column({ type: 'text' })
  categoria_do_titulo!: string;

  @Column({ type: 'int' })
  ano!: number;
  // Essa linha forja a Chave Estrangeira no banco, conectando o título ao jogador.
  @ManyToOne(() => JogadoresCopa, (jogador) => jogador.titulos, {
    onDelete: 'CASCADE',
  })
  jogador!: JogadoresCopa;
}

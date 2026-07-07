import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { JogadoresCopa } from '../../jogadores-copa/entities/jogadores-copa.entity';

@Entity('patrocinadores')
export class Patrocinador extends BaseEntity {
  @Column({ type: 'text', default: 'Não Foi Informado' })
  nomeDaMarca!: string;

  @Column({ type: 'text', default: 'Não Foi Informado' })
  ramoDeAtividade!: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  valorEmMilhoes!: number;

  @Column({ type: 'int', nullable: true })
  anoDeExpiracao!: number;
  // Essa linha forja a Chave Estrangeira no banco, conectando patrocinadores aos jogadores.
  @ManyToMany(() => JogadoresCopa, (jogadores) => jogadores.patrocinadores)
  jogadores!: JogadoresCopa[];
}

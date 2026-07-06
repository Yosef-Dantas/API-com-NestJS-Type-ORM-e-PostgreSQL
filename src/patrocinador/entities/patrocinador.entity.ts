import { Entity, Column, ManyToMany, Check } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { JogadoresCopa } from '../../jogadores-copa/entities/jogadores-copa.entity';

@Entity('patrocinadores')
@Check('chk_patrocinadores_validos', '"valor" > 0 AND "data_de_expiracao" > 0')
export class Patrocinador extends BaseEntity {
  @Column({ type: 'text' })
  nome_da_marca!: string;

  @Column({ type: 'text' })
  ramo_de_atividade!: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  valor!: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  data_de_expiracao!: number;
  // Essa linha forja a Chave Estrangeira no banco, conectando patrocinadores aos jogadores.
  @ManyToMany(() => JogadoresCopa, (jogadores) => jogadores.patrocinadores)
  jogadores!: JogadoresCopa[];
}

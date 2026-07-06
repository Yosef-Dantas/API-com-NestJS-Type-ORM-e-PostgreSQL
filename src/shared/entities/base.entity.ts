import { IsOptional, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @IsOptional()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt!: Date; //cammel case: NomeDaFuncao

  @UpdateDateColumn()
  updateAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}

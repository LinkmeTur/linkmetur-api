import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { JobPhotos } from './job_photos.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { JobEvaluation } from './job_evaluation.entity';

@Entity('job')
export class Job extends BaseEntity {
  @Column({ type: 'uuid' })
  corp_id: string;

  @ManyToOne(() => Corporation, (corporation) => corporation.jobs)
  corporation: Corporation;

  @Column({ type: 'varchar', length: 255 })
  nome_servico: string;

  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @Column({ type: 'varchar', length: 100 })
  sub_categoria: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  min_valor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  max_valor: number;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'integer', default: 0 })
  total_views: number;

  @Column({ type: 'text' })
  video_url: string;

  @Column({ type: 'text', array: true })
  certificacoes: string[];

  @Column({ type: 'varchar', length: 50 })
  disponibilidade: string;

  @Column({ type: 'boolean', default: false })
  publicado: boolean;

  @OneToMany(() => JobPhotos, (photos) => photos.job)
  fotos: JobPhotos[];

  @OneToMany(() => JobEvaluation, (evaluation) => evaluation.job)
  avaliacoes: JobEvaluation[];
}

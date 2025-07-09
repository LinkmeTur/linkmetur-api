import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { JobPhotos } from './job_photos.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { JobEvaluation } from './job_evaluation.entity';

@Entity()
export class Job extends BaseEntity {
  @Column({ nullable: false })
  corpId: string;

  @Column()
  nome_servico: string;

  @Column()
  categoria: string;

  @Column()
  sub_categoria: string;

  @Column()
  descricao: string;

  @Column()
  min_valor: number;

  @Column()
  max_valor: number;

  @Column({ nullable: true })
  views: number;

  @Column({ nullable: true })
  total_views: number;

  @Column()
  video_url: string;

  @Column()
  certificacoes: string;

  @Column()
  disponibilidade: string;

  @Column()
  publicado: boolean;

  @OneToMany(() => JobPhotos, (photo) => photo.job)
  photos: JobPhotos[];

  @ManyToOne(() => Corporation, (c) => c.jobs)
  corp: Corporation;

  @OneToMany(() => JobEvaluation, (ev) => ev.job)
  evaluations: JobEvaluation[];
}

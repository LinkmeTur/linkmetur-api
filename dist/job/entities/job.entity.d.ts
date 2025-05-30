import { BaseEntity } from 'src/database/entities/baseEntity';
import { JobPhotos } from './job_photos.entity';
export declare class Job extends BaseEntity {
    corp_Id: string;
    nome_servico: string;
    categoria: string;
    sub_categoria: string;
    descricao: string;
    min_valor: number;
    max_valor: number;
    video_url: string;
    certificacoes: string;
    disponibilidade: string;
    plubicado: boolean;
    photos: JobPhotos[];
}

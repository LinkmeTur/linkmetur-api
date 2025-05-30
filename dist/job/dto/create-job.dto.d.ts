import { JobPhotos } from '../entities/job_photos.entity';
export declare class CreateJobDto {
    corp_Id: string;
    nome_servico: string;
    categoria: string;
    sub_categoria: string;
    descricao: string;
    min_valor: number;
    max_valor: number;
    video_url?: string;
    certificacoes?: string;
    disponibilidade: string;
    publicado: boolean;
    photos?: JobPhotos[];
}

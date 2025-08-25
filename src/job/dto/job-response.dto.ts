// src/jobs/dto/job-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { JobPhotoResponseDto } from './job-photo-response.dto';

export class JobResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome_servico: string;

  @ApiProperty()
  categoria: string;

  @ApiProperty()
  sub_categoria: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  min_valor: number;

  @ApiProperty()
  max_valor: number;

  @ApiProperty()
  views: number;

  @ApiProperty()
  total_views: number;

  @ApiProperty()
  video_url: string;

  @ApiProperty({ type: [String] })
  certificacoes: string[];

  @ApiProperty()
  disponibilidade: string;

  @ApiProperty()
  publicado: boolean;

  @ApiProperty({ type: [JobPhotoResponseDto] })
  fotos: JobPhotoResponseDto[];

  @ApiProperty({ type: String })
  corp_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

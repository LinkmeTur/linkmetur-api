// src/request-for-proposal/dto/rfp-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { RequestPhotoResponseDto } from './request-photo-response.dto';

export class RfpResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  detalhes: string;

  @ApiProperty()
  valor_medio: number;

  @ApiProperty()
  tipo: string;

  @ApiProperty({ required: false })
  prazo: Date;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: String, required: false })
  job_id: string;

  @ApiProperty({ type: String, required: false })
  prestador_id: string;

  @ApiProperty({ type: [RequestPhotoResponseDto] })
  fotos: RequestPhotoResponseDto[];

  @ApiProperty({ type: String })
  corp_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

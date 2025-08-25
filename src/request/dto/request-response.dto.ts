// src/request/dto/request-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RequestResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome_job: string;

  @ApiProperty()
  nome_corp: string;

  @ApiProperty()
  nome_prestador: string;

  @ApiProperty()
  prazo: Date;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: String })
  rfp_id: string;

  @ApiProperty({ type: String })
  proposal_id: string;

  @ApiProperty({ type: String })
  job_id: string;

  @ApiProperty({ type: String })
  corp_id: string;

  @ApiProperty({ type: String })
  prestador_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

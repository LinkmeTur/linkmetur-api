// src/proposal/dto/proposal-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ProposalPhotoResponseDto } from './proposal-photo-response.dto';

export class ProposalResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  resumo_proposta: string;

  @ApiProperty()
  valor_proposta: number;

  @ApiProperty()
  observacoes: string;

  @ApiProperty({ required: false })
  prazo: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  selecionado: boolean;

  @ApiProperty({ type: [ProposalPhotoResponseDto] })
  fotos: ProposalPhotoResponseDto[];

  @ApiProperty({ type: String })
  rfp_id: string;

  @ApiProperty({ type: String })
  corp_id: string;

  @ApiProperty({ type: String, required: false })
  user_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

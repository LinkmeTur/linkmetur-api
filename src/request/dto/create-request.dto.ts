import { IsDateString, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  jobID: string;

  @IsString()
  nome_job: string;

  @IsString()
  corpID: string;

  @IsString()
  nome_corp: string;

  @IsString()
  prestadorID: string;

  @IsString()
  nome_prestador: string;

  @IsString()
  rfpID: string;

  @IsString()
  proposalID: string;

  @IsDateString()
  prazo: Date;

  @IsString()
  status: string;
}

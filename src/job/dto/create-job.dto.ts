import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsString({ message: 'O corp_Id deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O corp_Id é obrigatório.' })
  corp_Id: string;

  @IsString({ message: 'O servico deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O servico é obrigatorio.' })
  nome_servico: string;

  @IsString({ message: 'A categoria deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A categoria é obrigatoria.' })
  categoria: string;

  @IsString({ message: 'A sub_categoria deve ser uma string válida.' })
  sub_categoria: string;

  @IsString({ message: 'A descricao deve ser uma string válida.' })
  descricao: string;

  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  min_valor: number;

  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @IsNotEmpty({ message: 'O valor é obrigatório.' })
  max_valor: number;

  @IsOptional()
  video_url: string;

  @IsString({ message: 'As certificacoes devem ser uma string válida.' })
  certificacoes: string;

  @IsString({ message: 'A disponibilidade deve ser uma string válida.' })
  @IsNotEmpty({ message: 'A disponibilidade é obrigatoria.' })
  disponibilidade: string;
}

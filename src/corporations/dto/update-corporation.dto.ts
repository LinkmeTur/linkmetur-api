import { PartialType } from '@nestjs/mapped-types';
import { CreateCorporationDto } from './create-corporation.dto';

export class UpdateCorporationDto extends PartialType(CreateCorporationDto) {}

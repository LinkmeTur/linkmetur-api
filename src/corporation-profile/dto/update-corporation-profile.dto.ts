import { PartialType } from '@nestjs/swagger';
import { CreateCorporationProfileDto } from './create-corporation-profile.dto';

export class UpdateCorporationProfileDto extends PartialType(CreateCorporationProfileDto) {}

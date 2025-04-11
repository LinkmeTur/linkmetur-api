import { PartialType } from '@nestjs/mapped-types';
import { CreateTourismEnterpriseProfileDto } from './create-tourism-enterprise-profile.dto';

export class UpdateTourismEnterpriseProfileDto extends PartialType(CreateTourismEnterpriseProfileDto) {}

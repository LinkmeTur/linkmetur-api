import { Injectable } from '@nestjs/common';
import { CreateTourismEnterpriseProfileDto } from './dto/create-tourism-enterprise-profile.dto';
import { UpdateTourismEnterpriseProfileDto } from './dto/update-tourism-enterprise-profile.dto';

@Injectable()
export class TourismEnterpriseProfilesService {
  create(createTourismEnterpriseProfileDto: CreateTourismEnterpriseProfileDto) {
    return 'This action adds a new tourismEnterpriseProfile';
  }

  findAll() {
    return `This action returns all tourismEnterpriseProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourismEnterpriseProfile`;
  }

  update(id: number, updateTourismEnterpriseProfileDto: UpdateTourismEnterpriseProfileDto) {
    return `This action updates a #${id} tourismEnterpriseProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourismEnterpriseProfile`;
  }
}

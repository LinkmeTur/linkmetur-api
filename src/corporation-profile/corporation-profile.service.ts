import { Injectable } from '@nestjs/common';
import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CorporationProfile } from './entities/corporation-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CorporationProfileService {
  constructor(
    @InjectRepository(CorporationProfile)
    private readonly corporationProfileRepository: Repository<CorporationProfile>,
  ) {}

  async create(createCorporationProfileDto: CreateCorporationProfileDto) {
    const response = this.corporationProfileRepository.create(
      createCorporationProfileDto,
    );
    return await this.corporationProfileRepository.save(response);
  }

  async findAll() {
    return await this.corporationProfileRepository.find();
  }

  async findOne(id: string) {
    const profile = await this.corporationProfileRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new Error('Profile not found!');
    }
    return profile;
  }

  async update(
    id: string,
    updateCorporationProfileDto: UpdateCorporationProfileDto,
  ) {
    return await this.corporationProfileRepository.update(
      id,
      updateCorporationProfileDto,
    );
  }

  async remove(id: string) {
    return await this.corporationProfileRepository.delete(id);
  }
}

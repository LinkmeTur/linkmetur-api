import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CorporationProfile } from './entities/corporation-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CorporationProfileService {
  constructor(
    @InjectRepository(CorporationProfile)
    private readonly profileRepo: Repository<CorporationProfile>,
  ) {}

  async create(
    createDto: CreateCorporationProfileDto,
  ): Promise<CorporationProfile> {
    const profile = this.profileRepo.create(createDto);
    return this.profileRepo.save(profile);
  }

  async findAll(): Promise<CorporationProfile[]> {
    return await this.profileRepo.find({
      relations: {
        corp: {
          users: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<CorporationProfile> {
    const profile = await this.profileRepo.findOne({
      where: { id },
      relations: ['corp'],
    });
    if (!profile) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado`);
    }
    return profile;
  }

  async findByCorpId(corpId: string): Promise<CorporationProfile> {
    const profile = await this.profileRepo.findOne({
      where: { corpId },
      relations: ['corp'],
    });
    if (!profile) {
      throw new NotFoundException(`Perfil da empresa ${corpId} não encontrado`);
    }
    return profile;
  }

  async update(
    id: string,
    updateDto: UpdateCorporationProfileDto,
  ): Promise<CorporationProfile> {
    const profile = await this.findOne(id);
    Object.assign(profile, updateDto);
    return this.profileRepo.save(profile);
  }

  async remove(id: string): Promise<void> {
    const profile = await this.findOne(id);
    await this.profileRepo.remove(profile);
  }
}

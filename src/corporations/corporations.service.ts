import { Injectable } from '@nestjs/common';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';

@Injectable()
export class CorporationsService {
  create(createCorporationDto: CreateCorporationDto) {
    return 'This action adds a new corporation';
  }

  findAll() {
    return `This action returns all corporations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corporation`;
  }

  update(id: number, updateCorporationDto: UpdateCorporationDto) {
    return `This action updates a #${id} corporation`;
  }

  remove(id: number) {
    return `This action removes a #${id} corporation`;
  }
}

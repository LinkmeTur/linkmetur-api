import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    const request = this.requestRepository.create(createRequestDto);
    return await this.requestRepository.save(request);
  }

  async findAll() {
    return await this.requestRepository.find();
  }

  async findOne(id: string) {
    return await this.requestRepository.findOne({ where: { id } });
  }
  async findRequestByUserId(userId: string, tipo: 'P' | 'T') {
    if (tipo === 'P') {
      return await this.requestRepository.find({
        where: { prestadorID: userId },
        relations: { rfp: { fotos: true }, proposal: { fotos: true } },
      });
    } else {
      return await this.requestRepository.find({
        where: { corpID: userId },
        relations: { rfp: { fotos: true }, proposal: { fotos: true } },
      });
    }
  }
  async update(id: string, updateRequestDto: UpdateRequestDto) {
    await this.requestRepository.update(id, updateRequestDto);
    return await this.requestRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.requestRepository.delete(id);
    return { deleted: true };
  }
}

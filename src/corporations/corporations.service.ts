import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';
import { Corporation } from './entities/corporation.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CorporationsService {
  constructor(
    @InjectRepository(Corporation)
    private readonly corporationRepository: Repository<Corporation>,
    private readonly httpService: HttpService, // ✅ Injeção correta
  ) {}

  async create(
    createCorporationDto: CreateCorporationDto,
  ): Promise<Corporation> {
    const corporation = this.corporationRepository.create(createCorporationDto);
    return await this.corporationRepository.save(corporation);
  }

  async findAll(): Promise<Corporation[]> {
    const corporations = await this.corporationRepository.find({
      relations: {
        users: true,
        profile: true,
        jobs: true,
      },
    });
    return corporations;
  }

  async findOne(id: string): Promise<Corporation | string> {
    const corp = await this.corporationRepository.findOne({
      where: { id: id },
      relations: {
        users: true,
        profile: true,
      },
    });

    if (!corp) {
      return `Is Corporation ${id} not found!`;
    }
    return corp;
  }

  async update(
    id: string,
    updateCorporationDto: UpdateCorporationDto,
  ): Promise<Corporation | string> {
    await this.corporationRepository.update(id, updateCorporationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.corporationRepository.delete(id);
  }

  async consultaCNPJ(cnpj: string): Promise<any> {
    try {
      const reponse = await firstValueFrom(
        this.httpService.get(`https://publica.cnpj.ws/cnpj/${cnpj}`),
      );

      return reponse.data;
    } catch (error) {
      if (error) {
        throw new HttpException(
          'Erro ao consultar CNPJ',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async consultaCep(cep: string): Promise<any> {
    try {
      const reponse = await firstValueFrom(
        this.httpService.get(`https://brasilapi.com.br/api/cep/v2/${cep}`),
      );
      return reponse.data;
    } catch (error) {
      if (error) {
        throw new HttpException(
          'Erro ao consultar Cep',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}

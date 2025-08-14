import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';
import { Corporation, CorporationTipo } from './entities/corporation.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CorporationProfile } from 'src/corporation-profile/entities/corporation-profile.entity';
import { CnpjResponse } from './types/cnpj.types';
import { CepResponse } from './types/cep.types';

@Injectable()
export class CorporationsService {
  constructor(
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
    @InjectRepository(CorporationProfile)
    private readonly profileRepo: Repository<CorporationProfile>,
    private readonly httpService: HttpService, // ✅ Injeção correta
  ) {}

  async create(createDto: CreateCorporationDto): Promise<Corporation> {
    const existing = await this.corpRepo.findOne({
      where: [{ cnpj: createDto.cnpj }, { email: createDto.email }],
    });
    if (existing) {
      throw new Error('CNPJ ou email já cadastrado');
    }

    const corporation = this.corpRepo.create(createDto);
    const saved = await this.corpRepo.save(corporation);

    // Cria perfil vazio
    const profile = this.profileRepo.create({ corpID: saved.id });
    await this.profileRepo.save(profile);

    // Atualiza o profileId no corporation
    saved.profileId = profile.id;
    return this.corpRepo.save(saved);
  }

  async findAll(): Promise<Corporation[]> {
    const corporations = await this.corpRepo.find({
      relations: {
        users: true,
        profile: true,
        jobs: true,
      },
    });
    return corporations;
  }
  async findForType(tipo: string): Promise<Corporation[]> {
    if (!Object.values(CorporationTipo).includes(tipo as CorporationTipo)) {
      throw new HttpException(
        'Tipo de empresa inválido. Use "T" ou "P".',
        HttpStatus.BAD_REQUEST,
      );
    }
    const corporations = await this.corpRepo.find({
      where: { tipo: tipo as CorporationTipo },
      relations: {
        users: true,
      },
    });
    return corporations;
  }

  async findOne(id: string): Promise<Corporation | string> {
    const corp = await this.corpRepo.findOne({
      where: { id: id },
      relations: {
        users: true,
        profile: true,
      },
    });

    if (!corp) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }
    return corp;
  }

  async findByCnpj(cnpj: string): Promise<Corporation> {
    const corp = await this.corpRepo.findOne({ where: { cnpj } });
    if (!corp) {
      throw new NotFoundException(`Empresa com CNPJ ${cnpj} não encontrada`);
    }
    return corp;
  }

  async update(
    id: string,
    updateCorporationDto: UpdateCorporationDto,
  ): Promise<Corporation | string> {
    await this.corpRepo.update(id, updateCorporationDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.corpRepo.delete(id);
  }

  async consultaCNPJ(cnpj: string): Promise<any> {
    const cnpjNumeros = cnpj.replace(/\D/g, '');
    if (cnpjNumeros.length !== 14) {
      throw new HttpException('CNPJ inválido', HttpStatus.BAD_REQUEST);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<CnpjResponse>(
          `https://publica.cnpj.ws/cnpj/${cnpjNumeros}`,
        ),
      );

      if (!data || !data.razao_social) {
        throw new HttpException('CNPJ não encontrado', HttpStatus.NOT_FOUND);
      }

      return data;
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
    const cepNumeros = cep.replace(/\D/g, '');
    if (cepNumeros.length !== 8) {
      throw new HttpException('CEP inválido', HttpStatus.BAD_REQUEST);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<CepResponse>(
          `https://brasilapi.com.br/api/cep/v2/${cepNumeros}`,
        ),
      );

      if (!data || !data.city) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      return data;
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

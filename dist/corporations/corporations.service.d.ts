import { Repository } from 'typeorm';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';
import { Corporation } from './entities/corporation.entity';
import { HttpService } from '@nestjs/axios';
export declare class CorporationsService {
    private readonly corporationRepository;
    private readonly httpService;
    constructor(corporationRepository: Repository<Corporation>, httpService: HttpService);
    create(createCorporationDto: CreateCorporationDto): Promise<Corporation>;
    findAll(): Promise<Corporation[]>;
    findOne(id: string): Promise<Corporation | string>;
    update(id: string, updateCorporationDto: UpdateCorporationDto): Promise<Corporation | string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    consultaCNPJ(cnpj: string): Promise<any>;
    consultaCep(cep: string): Promise<any>;
}

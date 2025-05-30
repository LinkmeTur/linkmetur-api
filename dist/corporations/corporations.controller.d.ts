import { CorporationsService } from './corporations.service';
import { CreateCorporationDto } from './dto/create-corporation.dto';
import { UpdateCorporationDto } from './dto/update-corporation.dto';
export declare class CorporationsController {
    private readonly corporationsService;
    constructor(corporationsService: CorporationsService);
    create(createCorporationDto: CreateCorporationDto): Promise<import("./entities/corporation.entity").Corporation>;
    findAll(): Promise<import("./entities/corporation.entity").Corporation[]>;
    findOne(id: string): Promise<string | import("./entities/corporation.entity").Corporation>;
    update(id: string, updateCorporationDto: UpdateCorporationDto): Promise<string | import("./entities/corporation.entity").Corporation>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    consultCNPJ(cnpj: string): Promise<any>;
    consultCEP(cep: string): Promise<any>;
}

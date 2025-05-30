import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';
import { CorporationProfile } from './entities/corporation-profile.entity';
import { Repository } from 'typeorm';
export declare class CorporationProfileService {
    private readonly corporationProfileRepository;
    constructor(corporationProfileRepository: Repository<CorporationProfile>);
    create(createCorporationProfileDto: CreateCorporationProfileDto): Promise<CorporationProfile>;
    findAll(): Promise<CorporationProfile[]>;
    findOne(id: string): Promise<CorporationProfile>;
    update(id: string, updateCorporationProfileDto: UpdateCorporationProfileDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

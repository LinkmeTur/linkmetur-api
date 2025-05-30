import { CorporationProfileService } from './corporation-profile.service';
import { CreateCorporationProfileDto } from './dto/create-corporation-profile.dto';
import { UpdateCorporationProfileDto } from './dto/update-corporation-profile.dto';
export declare class CorporationProfileController {
    private readonly corporationProfileService;
    constructor(corporationProfileService: CorporationProfileService);
    create(createCorporationProfileDto: CreateCorporationProfileDto): Promise<import("./entities/corporation-profile.entity").CorporationProfile>;
    findAll(): Promise<import("./entities/corporation-profile.entity").CorporationProfile[]>;
    findOne(id: string): Promise<import("./entities/corporation-profile.entity").CorporationProfile>;
    update(id: string, updateCorporationProfileDto: UpdateCorporationProfileDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

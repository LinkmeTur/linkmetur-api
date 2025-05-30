import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
export declare class CorporationProfile extends BaseEntity {
    corpID: string;
    descricao: string;
    corp: Corporation;
}

import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
export declare class Contact extends BaseEntity {
    corporationID: string;
    contactID: string;
    saved_contact: boolean;
    favorited_contact: boolean;
    corporation: Corporation;
    contato: Corporation;
}

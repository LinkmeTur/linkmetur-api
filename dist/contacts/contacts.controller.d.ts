import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<import("./entities/contact.entity").Contact>;
    findOne(id: string): Promise<import("./entities/contact.entity").Contact[]>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<import("./entities/contact.entity").Contact | null>;
    remove(id: string): Promise<string>;
}

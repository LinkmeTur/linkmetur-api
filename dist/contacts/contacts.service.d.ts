import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
export declare class ContactsService {
    private readonly contactRepository;
    constructor(contactRepository: Repository<Contact>);
    create(createContactDto: CreateContactDto): Promise<Contact>;
    findContacts(id: string): Promise<Contact[]>;
    update(id: string, updateContactDto: UpdateContactDto): Promise<Contact | null>;
    remove(id: string): Promise<string>;
}

import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    const newContact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(newContact);
  }

  async findContacts(id: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: { corporationID: id },
      relations: ['contato'],
    });
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact | null> {
    await this.contactRepository.update(id, updateContactDto);
    return await this.contactRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const onDelete = await this.contactRepository.delete(id);
    if (!onDelete) {
      return 'Este contato não existe';
    }
    return `Contato #${id} deletado com sucesso.`;
  }
}

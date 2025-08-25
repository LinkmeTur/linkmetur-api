import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    // Verifica se email já existe
    const existing = await this.userRepository.findOne({
      where: { email: createDto.email },
    });
    if (existing) {
      throw new ConflictException(`Email ${createDto.email} já está em uso.`);
    }

    // Hashea a senha
    const hash_senha = await bcrypt.hash(createDto.senha, this.saltRounds);

    const user = this.userRepository.create({
      ...createDto,
      hash_senha, // salva o hash
    });

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['corporation'],
      select: {
        hash_senha: false, // não retorna hash_senha
      },
    });
  }

  async findAllByCorporation(corp_id: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { corp_id },
      relations: ['corporation'],
      select: {
        hash_senha: false,
      },
    });

    if (users.length === 0) {
      throw new NotFoundException(
        `Nenhum usuário encontrado para a corporation ID ${corp_id}`,
      );
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['corporation'],
      select: {
        hash_senha: false,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['corporation'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    }

    return user;
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateDto.email && updateDto.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: updateDto.email },
      });
      if (existing) {
        throw new ConflictException(`Email ${updateDto.email} já está em uso.`);
      }
    }

    if (updateDto.senha) {
      user.hash_senha = await bcrypt.hash(updateDto.senha, this.saltRounds);
      delete updateDto.senha;
    }

    Object.assign(user, updateDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
  }
}

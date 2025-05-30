import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | string> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        corp: true,
      },
    });
    if (!user) {
      return 'is not user';
    }
    return user;
  }
  async findOneByEmailAndPass(
    email: string,
    senha: string,
  ): Promise<User | string> {
    const user = await this.userRepository.findOne({
      where: { email, senha },
      relations: {
        corp: true,
      },
    });
    if (!user) {
      return 'is not user';
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<Array<User>>;
    findOne(id: string): Promise<User | string>;
    findOneByEmailAndPass(email: string, senha: string): Promise<User | string>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

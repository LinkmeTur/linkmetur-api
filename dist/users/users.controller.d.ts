import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<Array<User>>;
    findOne(id: string): Promise<string | User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    updateOne(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

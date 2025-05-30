import { HttpService } from '@nestjs/axios';
import { CreateTwoFactorDto } from './dto/create-twofactor.dto';
import { UsersService } from 'src/users/users.service';
export declare class AuthenticationsService {
    private userService;
    private readonly httpService;
    constructor(userService: UsersService, httpService: HttpService);
    signin(email: string, senha: string): Promise<string | import("../users/entities/user.entity").User | {
        message: string;
    }>;
    verificationTwoFactorCode({ codeFactor, data }: CreateTwoFactorDto): Promise<string | undefined>;
}

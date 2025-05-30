import { AuthenticationsService } from './authentications.service';
import { CreateTwoFactorDto } from './dto/create-twofactor.dto';
export declare class AuthenticationsController {
    private readonly authenticationsService;
    constructor(authenticationsService: AuthenticationsService);
    signWithEmailAndPass(data: {
        email: 'string';
        senha: 'string';
    }): Promise<any>;
    verificationTwoFactorCode(factor: CreateTwoFactorDto): Promise<any>;
}

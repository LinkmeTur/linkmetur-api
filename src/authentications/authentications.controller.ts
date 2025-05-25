import {
  Controller,
  // Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTwoFactorDto } from './dto/create-twofactor.dto';

@ApiBearerAuth('token')
@ApiTags('authentications')
@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}
  @Post()
  @ApiOperation({ summary: 'login' })
  @ApiBody({
    description: 'Autenticação de usuário',
    examples: {
      login: {
        value: {
          email: 'string',
          senha: 'string',
        },
      },
    },
  })
  signWithEmailAndPass(
    @Body() data: { email: 'string'; senha: 'string' },
  ): Promise<any> {
    return this.authenticationsService.signin(data.email, data.senha);
  }

  @Post('verificationTwoFactorCode')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({
    description: 'Two Factor Code Verification',
    type: CreateTwoFactorDto,
    examples: {
      exemplo1: {
        value: {
          codeFactor: 'string',
          data: 'string',
        },
      },
    },
  })
  verificationTwoFactorCode(@Body() factor: CreateTwoFactorDto): Promise<any> {
    return this.authenticationsService.verificationTwoFactorCode(factor);
  }
}

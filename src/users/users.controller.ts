import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@ApiBearerAuth('token')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({
    description: 'Dados necessários para criar um usuário',
    type: CreateUserDto,
    examples: {
      exemplo1: {
        value: {
          nome: ' string',
          email: 'string',
          senha: 'string',
          telefone: 'string',
          nivel: 'number',
          corpId: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou ausentes' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [User],
  })
  findAll(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Get(':id')
  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID do usuário',
    example: '12345',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID do usuário',
    example: '12345',
  })
  @ApiBody({
    description: 'Dados para atualização do usuário',
    type: UpdateUserDto,
    examples: {
      exemplo1: {
        value: {
          name: 'Jamerson Silva atualizado',
          email: 'jamerson_novo@email.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou ausentes' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um usuário' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID do usuário',
    example: '12345',
  })
  @ApiBody({
    description: 'Dados para atualização do usuário',
    type: UpdateUserDto,
    examples: {
      exemplo1: {
        value: {
          name: 'Jamerson Silva atualizado',
          email: 'jamerson_novo@email.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado parcialmente',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou ausentes' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID do usuário',
    example: '12345',
  })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

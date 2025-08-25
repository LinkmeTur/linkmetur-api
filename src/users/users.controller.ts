// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🟢 CREATE
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: 'Usuário criado com sucesso.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já cadastrado.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createDto);
    return this.toResponseDto(user);
  }

  // 🔍 FIND ALL
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => this.toResponseDto(user));
  }

  // 🔍 FIND BY CORPORATION
  @Get('corporation/:corp_id')
  @ApiOperation({ summary: 'Listar usuários por corporation ID' })
  @ApiParam({ name: 'corp_id', description: 'ID da corporation' })
  @ApiOkResponse({ type: [UserResponseDto] })
  async findAllByCorporation(
    @Param('corp_id') corp_id: string,
  ): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllByCorporation(corp_id);
    return users.map((user) => this.toResponseDto(user));
  }

  // 🔍 FIND BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado.',
  })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    return this.toResponseDto(user);
  }

  // 🔍 FIND BY EMAIL
  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiParam({ name: 'email', description: 'Email do usuário' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado.',
  })
  async findByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email);
    return this.toResponseDto(user);
  }

  // 🟡 UPDATE
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado.',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateDto);
    return this.toResponseDto(user);
  }

  // 🔴 DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Usuário removido com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }

  // ✅ Conversão para DTO de resposta
  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      avatar_url: user.avatar_url,
      nivel: user.nivel,
      corp_id: user.corp_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}

// src/users/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao@empresa.com' })
  email: string;

  @ApiProperty({ example: '11987654321' })
  telefone: string;

  @ApiProperty({ example: 'https://cdn.com/avatar.jpg', required: false })
  avatar_url: string;

  @ApiProperty({ example: 2 })
  nivel: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8' })
  corp_id: string;

  @ApiProperty({ example: '2025-04-05T10:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-04-05T10:00:00.000Z' })
  updated_at: Date;
}

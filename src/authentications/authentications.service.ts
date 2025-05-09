import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CorporationsService } from 'src/corporations/corporations.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationsService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private corporationService: CorporationsService,
  ) {}

  async signin() {}

  async register() {}
}

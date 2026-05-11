import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './types/jwt-payload.type';
import type { SafeUser } from '../users/users.service';

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto, res: Response): Promise<SafeUser> {
    const user = await this.usersService.create(dto);
    const tokens = await this.issueTokens(user.id, user.email, user.role);
    this.setAuthCookies(res, tokens);
    return user;
  }

  async login(dto: LoginDto, res: Response): Promise<SafeUser> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await argon2.verify(user.password_hash, dto.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    await this.usersService.updateLastLogin(user.id);

    const tokens = await this.issueTokens(user.id, user.email, user.role);
    this.setAuthCookies(res, tokens);

    const { password_hash, ...safe } = user;
    return safe;
  }

  async refresh(
    userId: number,
    email: string,
    role: string,
    res: Response,
  ): Promise<void> {
    const tokens = await this.issueTokens(userId, email, role);
    this.setAuthCookies(res, tokens);
  }

  logout(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  private async issueTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<AuthTokens> {
    const payload: JwtPayload = { sub: userId, email, role };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    ]);

    return { access_token, refresh_token };
  }

  private setAuthCookies(res: Response, tokens: AuthTokens): void {
    const isProd = this.configService.get('NODE_ENV') === 'production';

    const base = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict' as const,
      path: '/',
    };

    res.cookie('access_token', tokens.access_token, {
      ...base,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      ...base,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';
import type { SafeUser } from '../users/users.service';

interface RequestWithUser extends Request {
user: { id: number; email: string; role: string };
}

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

@Post('register')
@HttpCode(HttpStatus.CREATED)
register(
@Body() dto: RegisterDto,
@Res({ passthrough: true }) res: Response,
): Promise<SafeUser> {
return this.authService.register(dto, res);
}

@Post('login')
@HttpCode(HttpStatus.OK)
login(
@Body() dto: LoginDto,
@Res({ passthrough: true }) res: Response,
): Promise<SafeUser> {
return this.authService.login(dto, res);
}

@Post('logout')
@HttpCode(HttpStatus.OK)
logout(@Res({ passthrough: true }) res: Response): { message: string } {
this.authService.logout(res);
return { message: 'Logged out' };
}

@UseGuards(JwtRefreshGuard)
@Post('refresh')
@HttpCode(HttpStatus.OK)
async refresh(
@Req() req: RequestWithUser,
@Res({ passthrough: true }) res: Response,
): Promise<void> {
await this.authService.refresh(req.user.id, req.user.email, req.user.role, res);
}

@UseGuards(JwtAuthGuard)
@Get('me')
me(@Req() req: RequestWithUser): { id: number; email: string; role: string } {
return req.user;
}
}
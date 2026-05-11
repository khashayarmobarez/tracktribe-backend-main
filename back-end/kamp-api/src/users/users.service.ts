import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type SafeUser = Omit<User, 'password_hash'>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SafeUser[]> {
    const users = await this.prisma.user.findMany({ orderBy: { id: 'asc' } });
    return users.map(this.sanitize);
  }

  async findOne(id: number): Promise<SafeUser> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return this.sanitize(user);
  }

  // Internal — returns password_hash for auth verification
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(dto: CreateUserDto): Promise<SafeUser> {
    const { password, birth_date, ...rest } = dto;
    const password_hash = await argon2.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password_hash,
          birth_date: birth_date ? new Date(birth_date) : undefined,
        },
      });
      return this.sanitize(user);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<SafeUser> {
    await this.findOne(id);

    const { password, birth_date, ...rest } = dto;
    const password_hash = password ? await argon2.hash(password) : undefined;

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...rest,
          ...(password_hash && { password_hash }),
          birth_date: birth_date ? new Date(birth_date) : undefined,
        },
      });
      return this.sanitize(user);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<SafeUser> {
    await this.findOne(id);
    const user = await this.prisma.user.delete({ where: { id } });
    return this.sanitize(user);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { last_login: new Date() },
    });
  }

  private sanitize(user: User): SafeUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...safe } = user;
    return safe;
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('Email or phone number already exists');
    }
    throw error;
  }
}

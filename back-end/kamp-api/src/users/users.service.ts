import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: this.toCreateData(createUserDto),
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      return await this.prisma.user.update({
        where: { id },
        data: this.toUpdateData(updateUserDto),
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  private toCreateData(userDto: CreateUserDto): Prisma.UserCreateInput {
    return {
      ...userDto,
      birth_date: userDto.birth_date ? new Date(userDto.birth_date) : undefined,
      organizer_verified_at: userDto.organizer_verified_at
        ? new Date(userDto.organizer_verified_at)
        : undefined,
      coach_verified_at: userDto.coach_verified_at
        ? new Date(userDto.coach_verified_at)
        : undefined,
      last_login: userDto.last_login ? new Date(userDto.last_login) : undefined,
    };
  }

  private toUpdateData(userDto: UpdateUserDto): Prisma.UserUpdateInput {
    return {
      ...userDto,
      birth_date: userDto.birth_date ? new Date(userDto.birth_date) : undefined,
      organizer_verified_at: userDto.organizer_verified_at
        ? new Date(userDto.organizer_verified_at)
        : undefined,
      coach_verified_at: userDto.coach_verified_at
        ? new Date(userDto.coach_verified_at)
        : undefined,
      last_login: userDto.last_login ? new Date(userDto.last_login) : undefined,
    };
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

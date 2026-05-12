import { Exclude } from 'class-transformer';
import { Role } from '@prisma/client';

export class UserResponseDto {
  id: number;
  full_name: string;
  phone_number?: string;
  email: string;

  @Exclude()
  password_hash: string;

  avatar_url?: string;
  gender?: string;
  age?: number;
  birth_date?: Date;
  city?: string;
  bio?: string;
  role: Role;
  organizer_verified_at?: Date;
  coach_verified_at?: Date;
  created_at: Date;
  last_login?: Date;
}



import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  full_name: string;
  phone_number?: string;
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  avatar_url?: string;
  gender?: string;
  age?: number;
  birth_date?: string;
  city?: string;
  bio?: string;
  role?: string;
  organizer_verified_at?: string;
  coach_verified_at?: string;
  last_login?: string;
}

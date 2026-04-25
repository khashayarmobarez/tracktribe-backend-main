export class CreateUserDto {
  full_name: string;
  phone_number?: string;
  email: string;
  password_hash: string;
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

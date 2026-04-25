# KAMP API

KAMP API is a NestJS backend for user profiles and trail comments. It uses PostgreSQL through Prisma ORM and exposes a simple REST API that can be tested with Insomnia, Postman, or any HTTP client.

## Tech Stack

- NestJS 11
- TypeScript
- Prisma 7
- PostgreSQL / PostGIS
- pnpm
- Jest

## Current Features

- User profile database model
- Comment database model with replies
- Full user CRUD API
- Prisma migrations
- Prisma Client with PostgreSQL driver adapter
- Unit test setup with Jest

## API Endpoints

```text
GET     /users
GET     /users/:id
POST    /users
PATCH   /users/:id
DELETE  /users/:id
```

Base URL during local development:

```text
http://localhost:3000
```

## User Payload Example

Use this JSON body for `POST /users`:

```json
{
  "full_name": "Jane Doe",
  "phone_number": "+14165550123",
  "email": "jane.doe@example.com",
  "password_hash": "test-hash",
  "avatar_url": "https://example.com/avatars/jane.jpg",
  "gender": "female",
  "birth_date": "1998-05-21",
  "city": "Toronto",
  "bio": "Fitness enthusiast and event organizer.",
  "role": "user"
}
```

Use this JSON body for `PATCH /users/:id`:

```json
{
  "city": "Ottawa",
  "bio": "Updated profile bio"
}
```

## Database Models

The app currently has two Prisma models:

- `User`
- `Comment`

`Comment` belongs to a user and can also have replies through `parent_comment_id`.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

For the current local Docker database, use:

```env
DATABASE_URL="postgresql://kamp_user:kamp_password@localhost:5433/kamp_db"
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start the development server:

```bash
pnpm start:dev
```

Open:

```text
http://localhost:3000/users
```

## Prisma Workflow

When changing the database:

1. Edit `prisma/schema.prisma`
2. Create and apply a migration:

```bash
npx prisma migrate dev --name your-change-name
```

3. Regenerate Prisma Client:

```bash
npx prisma generate
```

Useful Prisma commands:

```bash
npx prisma studio
npx prisma migrate status
npx prisma format
```

## Scripts

```bash
pnpm start:dev
pnpm build
pnpm lint
pnpm test
```

## Verification

Before pushing code, run:

```bash
pnpm build
pnpm test -- --runInBand
```

## Project Structure

```text
src/
  prisma/
    prisma.module.ts
    prisma.service.ts
  users/
    dto/
    users.controller.ts
    users.module.ts
    users.service.ts
prisma/
  migrations/
  schema.prisma
```

## Notes

- The local API listens on port `3000`.
- The local Docker PostgreSQL database is expected on port `5433`.
- The `.env` file is ignored by Git.
- Password hashing is not implemented yet. Current `password_hash` values are accepted as provided.

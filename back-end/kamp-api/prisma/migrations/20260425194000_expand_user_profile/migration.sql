-- Preserve existing development data while reshaping the User table.
ALTER TABLE "User" RENAME COLUMN "name" TO "full_name";
ALTER TABLE "User" RENAME COLUMN "password" TO "password_hash";
ALTER TABLE "User" RENAME COLUMN "createdAt" TO "created_at";

UPDATE "User"
SET "full_name" = COALESCE("full_name", "email", 'Unknown User');

ALTER TABLE "User" ADD COLUMN "phone_number" TEXT;
ALTER TABLE "User" ADD COLUMN "avatar_url" TEXT;
ALTER TABLE "User" ADD COLUMN "gender" TEXT;
ALTER TABLE "User" ADD COLUMN "birth_date" DATE;
ALTER TABLE "User" ADD COLUMN "city" TEXT;
ALTER TABLE "User" ADD COLUMN "bio" TEXT;
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';
ALTER TABLE "User" ADD COLUMN "organizer_verified_at" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "coach_verified_at" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "last_login" TIMESTAMP(3);

ALTER TABLE "User" ALTER COLUMN "full_name" SET NOT NULL;

CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

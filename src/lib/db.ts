import Database from "better-sqlite3";
import path from "path";

// Vercel serverless-এ ফাইল রাইট করার জন্য /tmp ডিরেক্টরি প্রয়োজন হয়
const dbPath = process.env.VERCEL
  ? path.join("/tmp", "sqlite.db")
  : path.join(process.cwd(), "sqlite.db");

export const db = new Database(dbPath);

// যাতে 500 error না আসে
db.exec(`
  CREATE TABLE IF NOT EXISTS "user" ("id" text primary key, "name" text, "email" text unique, "emailVerified" integer, "image" text, "createdAt" date, "updatedAt" date);
  CREATE TABLE IF NOT EXISTS "session" ("id" text primary key, "expiresAt" date, "token" text unique, "createdAt" date, "updatedAt" date, "ipAddress" text, "userAgent" text, "userId" text references "user"("id") on delete cascade);
  CREATE TABLE IF NOT EXISTS "account" ("id" text primary key, "accountId" text, "providerId" text, "userId" text references "user"("id") on delete cascade, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" date, "refreshTokenExpiresAt" date, "scope" text, "password" text, "createdAt" date, "updatedAt" date);
  CREATE TABLE IF NOT EXISTS "verification" ("id" text primary key, "identifier" text, "value" text, "expiresAt" date, "createdAt" date, "updatedAt" date);
`);

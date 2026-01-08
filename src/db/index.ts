import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Use a local file for the database. 
// In Next.js, ensure this path is persistent or handled correctly in Vercel/similar if deployed.
// For local dev/user request, simple file is fine.
const dbPath = path.join(process.cwd(), 'sqlite.db');
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

import { config } from 'dotenv';
import { Client } from 'pg';

config({ path: '.env.test' });

export default async function globalTeardown() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres',
  });

  await client.connect();

  try {
    const dbName = process.env.DB_DATABASE || 'brain_agriculture_test';
    await client.query(`DROP DATABASE IF EXISTS "${dbName}" WITH (FORCE)`);
    console.log(`Database "${dbName}" cleaned up.`);
  } catch {
    // Ignore cleanup errors
  }

  await client.end();
}

const database = (await import("$/data/database/backend/db_deno_kv.ts")).databaseBackend;

export { database as Database };

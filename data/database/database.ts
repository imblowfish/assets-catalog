const database = (await import("$/data/database/backend/deno_kv.ts")).databaseBackend;

export { database as Database };

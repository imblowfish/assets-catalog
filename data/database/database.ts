import type { User, Session, Asset } from "$/data/database/backend/db_api.ts";

const database = (await import("$/data/database/backend/db_deno_kv.ts"))
  .databaseBackend;

export { database as Database, User, Session, Asset };

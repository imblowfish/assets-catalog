import type { Asset, Session, User } from "$/data/database/backend/db_api.ts";

const database = (await import("$/data/database/backend/db_deno_kv.ts"))
  .databaseBackend;

export { Asset, database as Database, Session, User };

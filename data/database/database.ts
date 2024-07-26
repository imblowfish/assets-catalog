import type {
  Asset,
  DatabaseBackend,
  Session,
  User,
} from "$/data/database/backend/db_api.ts";

const databaseEngine = Deno.env.get("DATABASE_ENGINE");

let database: DatabaseBackend;

switch (databaseEngine) {
  case "DenoKv":
    database = (await import("$/data/database/backend/db_deno_kv.ts"))
      .databaseBackend;
    break;
  default:
    throw new Error(`Unknown database backend ${databaseEngine}`);
}

export { Asset, database as Database, Session, User };

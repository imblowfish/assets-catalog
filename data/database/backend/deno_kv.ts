/// <reference lib="deno.unstable" />
import { load } from "$std/dotenv/mod.ts";
import { DatabaseBackend, User } from "$/data/database/backend/db_api.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const databasePath = Deno.env.get("DATABASE_PATH") || config["DATABASE_PATH"];

console.log("Database initialization");
console.log(`DATABASE_PATH=${databasePath}`);

const kv = await Deno.openKv(databasePath);

export const databaseBackend = {
  insertUser: async (user) => {
    const primaryKey = ["users", user.id];
    const byEmailKey = ["users_by_email", user.email];
    const byUsernameKey = ["users_by_username", user.username];

    await kv
      .atomic()
      .check({
        key: primaryKey,
        versionstamp: null,
      })
      .check({
        key: byEmailKey,
        versionstamp: null,
      })
      .check({
        key: byUsernameKey,
        versionstamp: null,
      })
      .set(primaryKey, user)
      .set(byEmailKey, user)
      .set(byUsernameKey, user);
  },
  getUserByEmail: async (email) => {
    const byEmailKey = ["users_by_email", email];
    return (await kv.get<User>(byEmailKey)).value as User | null;
  },
  getUserByUsername: async (username) => {
    const byUsernameKey = ["users_by_username", username];
    return (await kv.get<User>(byUsernameKey)).value as User | null;
  },
  insertSession: async (session) => {
    const primaryKey = ["sessions", session.id];
    await kv
      .atomic()
      .check({
        key: primaryKey,
        versionstamp: null,
      })
      .set(primaryKey, session);
  },
  deleteSession: async (sessionId) => {
    const primaryKey = ["sessions", sessionId];
    await kv.delete(primaryKey);
  },
} satisfies DatabaseBackend;

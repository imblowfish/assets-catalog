/// <reference lib="deno.unstable" />
import * as path from "$std/path/mod.ts";
import { load } from "$std/dotenv/mod.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const databasePath = Deno.env.get("DATABASE_PATH") || config["DATABASE_PATH"];

console.log("Database initialization");
console.log(`DATABASE_PATH=${databasePath}`);

await Deno.mkdir(path.dirname(databasePath), {
  recursive: true,
});

export interface Asset {
  id: string;
  title: string;
  description: string;
}

const kv = await Deno.openKv(Deno.env.get("DATABASE_PATH"));

export { kv as Database };

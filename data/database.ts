import * as path from "$std/path/mod.ts";
import { load } from "$std/dotenv/mod.ts";

await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const databasePath = Deno.env.get("DATABASE_PATH")!;

console.log("Database initialization");
console.log(`DATABASE_PATH=${databasePath}`);

await Deno.mkdir(path.dirname(databasePath), {
  recursive: true,
});

export interface Asset {
  title: string;
  description: string;
  path: string;
  type: string;
}

// @ts-expect-error `Deno.openKv` is unstable and I can't set this flag in VSCode
//                  with a multi-root workspace
const kv = await Deno.openKv(Deno.env.get("DATABASE_PATH"));

export { kv as Database };

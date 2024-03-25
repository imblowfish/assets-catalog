import "$/data/database.ts";

const databasePath = Deno.env.get("DATABASE_PATH")!;

Deno.test(
  "Database files were created on initialization on specific path",
  async () => {
    await Deno.stat(databasePath);
    await Deno.remove("./tmp/test", { recursive: true });
  },
);

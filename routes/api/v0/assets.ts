import { Handlers } from "$fresh/server.ts";
import { ulid } from "ulid/mod.ts";
import { AssetData, Database } from "$/data/database.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const assets = [];
    for await (const entry of await Database.list({ prefix: ["assets"] })) {
      assets.push(entry.value);
    }
    return new Response(JSON.stringify(assets), {
      status: 200,
    });
  },

  async POST(req, _ctx) {
    const form = await req.formData();

    const title = form.get("title")!.toString();
    const description = form.get("description")!.toString();
    const url = form.get("url")!.toString();

    try {
      const id = ulid();

      const asset = {
        id,
        title,
        description,
        url,
      } satisfies AssetData;

      const ok = await Database.atomic().set(["assets", id], asset).commit();

      if (!ok) {
        throw new Error("Error with atomic operation");
      }

      return new Response(JSON.stringify(asset), {
        status: 200,
      });
    } catch (err) {
      return new Response(`${(err as Error).message}`, {
        status: 500,
      });
    }
  },
};

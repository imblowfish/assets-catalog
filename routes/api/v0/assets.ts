import { HandlerContext, Handlers } from "$fresh/server.ts";
import { ulid } from "ulid/mod.ts";
import { Asset, Database } from "$/data/database.ts";
import { saveToStorage } from "$/data/storage.ts";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const assets = [];
    for await (const entry of await Database.list({ prefix: ["assets"] })) {
      assets.push(entry.value);
    }
    return new Response(JSON.stringify(assets), {
      status: 200,
    });
  },

  async POST(req: Request, _ctx: HandlerContext) {
    const form = await req.formData();

    const title = form.get("title")!.toString();
    const description = form.get("description")!.toString();
    const file = form.get("file") as File;

    if (!file) {
      console.error("'file' field is empty");
      return new Response("'file' field is empty", {
        status: 400,
      });
    }

    try {
      const id = ulid();
      const asset = {
        id,
        title,
        description,
        path: await saveToStorage(file, id),
        type: file.type,
      } satisfies Asset;

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

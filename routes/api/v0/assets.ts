import { HandlerContext, Handlers } from "$fresh/server.ts";
import { ulid } from "ulid/mod.ts";
import { Asset, Database } from "$/data/database.ts";
import { saveToStorage } from "$/data/storage.ts";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: HandlerContext) {
    const entries = Database.list({ prefix: ["assets"] });
    const assets = [];
    for await (const entry of entries) {
      assets.push(entry);
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
      const path = await saveToStorage(file, id);

      await Database.set(
        ["assets", id],
        {
          title,
          description,
          path,
          type: file.type,
        } satisfies Asset,
      );

      return new Response("", {
        status: 200,
      });
    } catch (err) {
      return new Response(`${(err as Error).message}`, {
        status: 500,
      });
    }
  },
};

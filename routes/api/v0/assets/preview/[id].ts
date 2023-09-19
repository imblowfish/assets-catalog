import { Handlers } from "$fresh/server.ts";
import { getAssetData } from "$/data/storage.ts";
import { Database } from "$/data/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;

    const asset = await Database.get(["assets", id]);

    if (!asset.value) {
      return new Response(null, { status: 404 });
    }

    try {
      return new Response(await getAssetData(id), { status: 200 });
    } catch (_err) {
      return new Response(null, { status: 500 });
    }
  },
};

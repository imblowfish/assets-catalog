import { Handlers } from "$fresh/server.ts";
import { getFromStorage } from "$/data/storage.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return new Response(await getFromStorage(decodeURI(ctx.params.filename)), {
      status: 200,
    });
  },
};

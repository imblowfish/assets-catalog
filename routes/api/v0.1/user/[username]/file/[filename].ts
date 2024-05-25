import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { Storage } from "$/data/storage/storage.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const username = ctx.params.username;
    const filename = ctx.params.filename;

    return new Response(await Storage.object.get(username, filename), {
      status: HttpCode.Ok,
    });
  },
};

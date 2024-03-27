import { Handlers } from "$fresh/server.ts";
import { deleteFromStorage, getFromStorage } from "$/data/storage.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      return new Response(
        await getFromStorage(decodeURI(ctx.params.filename)),
        {
          status: 200,
        },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          message: `Can't find '${ctx.params.filename}' in the storage: ${
            (err as Error).message
          }`,
        }),
        { status: 500 },
      );
    }
  },

  async DELETE(_req, ctx) {
    try {
      await deleteFromStorage(decodeURI(ctx.params.filename));
      return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    } catch (err) {
      return new Response(
        JSON.stringify({
          message: `Can't delete ${ctx.params.filename} from the storage: ${
            (err as Error).message
          }`,
        }),
        { status: 500 },
      );
    }
  },
};

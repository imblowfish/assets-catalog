import { Handlers } from "$fresh/server.ts";
import { saveToStorage } from "$/data/storage.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      console.error("'file' field is empty");
      return new Response("'file' field is empty", { status: 400 });
    }

    try {
      return new Response(
        JSON.stringify({
          url: encodeURI(`${ctx.url.href}/${await saveToStorage(file)}`),
        }),
        {
          status: 200,
        },
      );
    } catch (err) {
      return new Response(`${(err as Error).message}`, { status: 500 });
    }
  },
};

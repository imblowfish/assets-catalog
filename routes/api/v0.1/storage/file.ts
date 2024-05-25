import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Storage } from "$/data/storage/storage.ts";

export const handler: Handlers = {
  // NOTE: To check `curl -X POST --form file=@path-to-some-file <api route url>`
  async POST(req, ctx) {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({
        message: ErrorCode.API_STORAGE_FILE_IS_NULL,
      }), {
        status: HttpCode.BadRequest,
      });
    }

    // await Storage.object.create({
    //   name: file.name,
    //   type: file.type,
    //   size: file.size,
    //   data: new Uint8Array(await file.arrayBuffer())
    // })

    return new Response(null, {
      status: HttpCode.BadRequest,
    });
  },
};

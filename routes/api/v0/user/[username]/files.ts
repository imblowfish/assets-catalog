import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Storage } from "$/data/storage/storage.ts";
import { FileCreationResponse } from "$/data/responses.ts";

export const handler: Handlers = {
  // NOTE: To check `curl -X POST --form file=@path-to-some-file <api route url>`
  async POST(req, ctx) {
    const username = ctx.params.username;
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_STORAGE_FILE_IS_NULL,
        }),
        {
          status: HttpCode.BadRequest,
        }
      );
    }

    await Storage.bucket.create({
      name: username,
    });

    // TODO: Add check if file already exists for versioning

    await Storage.object.create({
      bucket: username,
      name: file.name,
      data: new Uint8Array(await file.arrayBuffer()),
    });

    return new Response(
      JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
        url: `http://localhost:8000/api/v0/user/${username}/file/${file.name}`,
        lastModified: file.lastModified,
      } satisfies FileCreationResponse),
      {
        status: HttpCode.Created,
      }
    );
  },
};

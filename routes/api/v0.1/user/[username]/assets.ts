import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Asset, Database } from "$/data/database/database.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const username = ctx.params.username;
    const { title, description, objectUrl } = await req.json();

    if (!title) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_ASSET_EMPTY_TITLE,
        }),
        {
          status: HttpCode.BadRequest,
        }
      );
    }

    if (!objectUrl) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_ASSET_OBJECT_URL_IS_EMPTY,
        }),
        { status: HttpCode.BadRequest }
      );
    }

    const assetId = crypto.randomUUID();
    const asset = {
      id: assetId,
      title: title,
      description: description || "",
      collectionId: "default",
      username: username,
      objectUrl: objectUrl,
      url: `http://localhost:8000/api/v0.1/user/${username}/assets/${assetId}`,
      htmlUrl: `http://localhost:8000/user/${username}/assets/${assetId}`,
    } satisfies Asset;

    await Database.assets.insert(asset);

    return new Response(JSON.stringify(asset), {
      status: HttpCode.Created,
    });
  },
  async GET(_req, ctx) {
    const username = ctx.params.username;
    if (!username) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_USER_USERNAME_IS_NOT_SET,
        }),
        {
          status: HttpCode.BadRequest,
        }
      );
    }

    const user = await Database.users.get.byUsername(username);
    if (!user) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_USER_USERNAME_IS_UNKNOWN,
        }),
        {
          status: HttpCode.NotFound,
        }
      );
    }

    const assets = await Database.assets.get.byUsername(user.username);

    return new Response(JSON.stringify(assets), {
      status: HttpCode.Ok,
    });
  },
};

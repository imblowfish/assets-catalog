import { Handlers } from "$fresh/server.ts";
import { Database } from "$/data/database/database.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const assetId = ctx.params.assetId;
    const asset = await Database.assets.get.byAssetId(assetId);
    if (!asset) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_ASSET_NOT_FOUND,
        }),
        {
          status: HttpCode.NotFound,
        }
      );
    }

    return new Response(JSON.stringify(asset), {
      status: HttpCode.Ok,
    });
  },
  async DELETE(_req, ctx) {
    const assetId = ctx.params.assetId;
    const asset = await Database.assets.get.byAssetId(assetId);
    if (!asset) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_ASSET_NOT_FOUND,
        }),
        {
          status: HttpCode.NotFound,
        }
      );
    }

    await Database.assets.delete(assetId);

    return new Response(null, {
      status: HttpCode.Ok,
    });
  },
};

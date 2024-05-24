import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Database } from "$/data/database/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const userId = ctx.params.userId;
    if (!userId) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_USER_USER_ID_IS_NOT_SET,
        }),
        {
          status: HttpCode.BadRequest,
        }
      );
    }

    const user = await Database.users.get.byUserId(userId);
    if (!user) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_USER_USER_ID_IS_UNKNOWN,
        }),
        {
          status: HttpCode.NotFound,
        }
      );
    }

    const assets = await Database.assets.get.byUserId(user.id);

    return new Response(JSON.stringify(assets), {
      status: HttpCode.Ok,
    });
  },
};

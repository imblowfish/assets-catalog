import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Database } from "$/data/database/database.ts";

export const handler: Handlers = {
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

    const assets = await Database.assets.get.byUserId(user.id);

    return new Response(JSON.stringify(assets), {
      status: HttpCode.Ok,
    });
  },
};

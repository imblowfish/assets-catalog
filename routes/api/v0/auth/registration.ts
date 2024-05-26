import * as bcrypt from "bcrypt";
import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { Database } from "$/data/database/database.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const authorization = req.headers.get("authorization") as string | null;
    if (!authorization) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_HEADER_EMPTY,
        }),
        {
          status: HttpCode.BadRequest,
        },
      );
    }

    const [email, password, username] = atob(
      authorization.replace("Basic ", ""),
    ).split(":");

    if (!email || !password || !username) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
        }),
        {
          status: HttpCode.BadRequest,
        },
      );
    }

    if (await Database.users.unsafe.get.byEmail(email)) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_EMAIL_ALREADY_IN_USE,
        }),
        {
          status: HttpCode.Conflict,
        },
      );
    }

    if (await Database.users.get.byUsername(username)) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_USERNAME_ALREADY_IN_USE,
        }),
        {
          status: HttpCode.Conflict,
        },
      );
    }

    await Database.users.insert({
      id: crypto.randomUUID(),
      email,
      username,
      password: await bcrypt.hash(password, await bcrypt.genSalt()),
      url: `http://localhost:8000/api/v0/user/${username}`,
      htmlUrl: `http://localhost:8000/user/${username}`,
    });

    return new Response(null, {
      status: HttpCode.Created,
    });
  },
};

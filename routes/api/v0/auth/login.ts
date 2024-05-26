import * as bcrypt from "bcrypt";
import { setCookie } from "$std/http/cookie.ts";
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
          status: HttpCode.Unauthorized,
        },
      );
    }

    const [email, password] = atob(authorization.replace("Basic ", "")).split(
      ":",
    );

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
        }),
        {
          status: HttpCode.Unauthorized,
        },
      );
    }

    const user = await Database.users.unsafe.get.byEmail(email);
    if (!user) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_EMAIL_UNKNOWN,
        }),
        {
          status: HttpCode.Unauthorized,
        },
      );
    }

    if (!bcrypt.compare(password, user.password)) {
      return new Response(
        JSON.stringify({
          message: ErrorCode.API_AUTH_PASSWORD_IS_INCORRECT,
        }),
        {
          status: HttpCode.Unauthorized,
        },
      );
    }

    const sessionId = crypto.randomUUID();

    await Database.sessions.insert({
      id: sessionId,
      username: user.username,
    });

    const url = new URL(req.url);
    const headers = new Headers();
    setCookie(headers, {
      name: "sessionId",
      value: sessionId, // this should be a unique value for each session
      maxAge: 7 * 24 * 60 * 60, // 1 week
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
      httpOnly: true,
    });

    return new Response(null, {
      status: HttpCode.Ok,
      headers,
    });
  },
};

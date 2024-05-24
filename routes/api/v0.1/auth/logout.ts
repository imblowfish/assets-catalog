import { deleteCookie } from "$std/http/cookie.ts";
import { Handlers } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { Database } from "$/data/database/database.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);

    const sessionId = headers.get("sessionId") as string | null;
    if (sessionId) {
      await Database.session.delete(sessionId);
    }

    deleteCookie(headers, "sessionId", {
      path: "/",
      domain: url.hostname,
    });
    headers.set("location", "/");

    return new Response(null, {
      status: HttpCode.SeeOther,
      headers,
    });
  },
};

import { getCookies } from "$std/http/cookie.ts";
import { FreshContext } from "$fresh/server.ts";
import { Database, Session } from "$/data/database/database.ts";

export const handler = [
  async (req: Request, ctx: FreshContext<Session>) => {
    if (ctx.destination !== "route") {
      return ctx.next();
    }

    const cookies = getCookies(req.headers);
    if (!cookies.sessionId) {
      return ctx.next();
    }

    const session = await Database.sessions.get.bySessionId(cookies.sessionId);
    if (!session) {
      return ctx.next();
    }

    ctx.state = {
      ...session,
    } satisfies Session;

    return ctx.next();
  },
];

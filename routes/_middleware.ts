import { getCookies } from "$std/http/cookie.ts";
import { FreshContext } from "$fresh/server.ts";
import { Database, type Session } from "$/data/database/database.ts";

export const handler = [
  async (req: Request, ctx: FreshContext<Session>) => {
    if (ctx.destination !== "route") {
      return ctx.next();
    }

    const cookies = getCookies(req.headers);
    if (!cookies.sessionId) {
      // console.log("'sessionId' not found in cookies");
      return ctx.next();
    }

    const session = await Database.sessions.get.bySessionId(cookies.sessionId);
    if (!session) {
      // console.log("Can't find session by provided 'sessionId'");
      return ctx.next();
    }

    ctx.state = {
      ...session
    } satisfies Session;

    return ctx.next();
  },
];

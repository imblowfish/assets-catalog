import { FreshContext } from "$fresh/server.ts";
import { Database, type Session } from "$/data/database/database.ts";

export const handler = [
  async (req: Request, ctx: FreshContext<Session>) => {
    const sessionId = req.headers.get("sessionId");
    if (!sessionId) {
      return ctx.next();
    }

    const session = await Database.sessions.get.bySessionId(sessionId);
    if (!session) {
      return ctx.next();
    }

    ctx.state = {
      ...session
    } satisfies Session;

    return ctx.next();
  },
];

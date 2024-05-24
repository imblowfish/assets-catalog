import { FreshContext } from "$fresh/server.ts";
import type { Session } from "$/data/database/database.ts";

export const handler = [
  (_req: Request, ctx: FreshContext<Session>) => {
    // TODO:
    // const sessionId = req.headers.get("sessionId");
    // if (sessionId) {
    //   return ctx.next();
    // }
    // const session = await Database.session.get.bySessionId(sessionId);
    // if (!session) {
    //  return ctx.next();
    // }
    // ctx.state = {
    //  ...session,
    // } satisfies Session;
    ctx.state = {
      id: "123",
      userId: "321",
    } satisfies Session;

    return ctx.next();
  },
];

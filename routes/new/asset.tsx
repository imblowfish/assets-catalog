import { Head } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { Session, User } from "$/data/database/database.ts";
import { Header } from "$/components/Header.tsx";
import { CreateNewAsset } from "$/islands/Actions.tsx";

export default async function NewAsset(
  _req: Request,
  ctx: FreshContext<Session>,
) {
  const session = ctx.state;
  if (!session?.id) {
    return Response.redirect(
      "http://localhost:8000/auth/login",
      HttpCode.SeeOther,
    );
  }

  const resp = await fetch(
    `http://localhost:8000/api/v0/user/${session.username}`,
  );
  if (resp.status !== HttpCode.Ok) {
    throw new Error(
      `API returned error [${resp.status}]: ${await resp.text()}`,
    );
  }

  const user = (await resp.json()) as User;

  return (
    <>
      <Head>
        <title>New asset</title>
      </Head>
      <main>
        <Header
          showActions
          user={user}
        />
        <CreateNewAsset username={user.username} />
      </main>
    </>
  );
}

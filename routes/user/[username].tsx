import { Head } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { Session, User } from "$/data/database/database.ts";
import { Header } from "$/components/Header.tsx";
import { AvatarFull } from "$/components/Avatar.tsx";

export default async function UserPage(
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

  const username = ctx.params.username;

  const resp = await fetch(`http://localhost:8000/api/v0/user/${username}`);
  if (resp.status !== HttpCode.Ok) {
    throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
  }

  const user = (await resp.json()) as User;

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <main>
        <Header
          showActions
          user={user}
        />
        <div class="flex flex-col items-center m-4">
          <AvatarFull userUrl={user.htmlUrl} />
          <p class="text-2xl mt-4">{username}</p>
        </div>
      </main>
    </>
  );
}

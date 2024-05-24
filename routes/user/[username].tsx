import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { AvatarFull } from "$/components/Avatar.tsx";
import { FreshContext } from "$fresh/server.ts";
import { Session, User } from "$/data/database/database.ts";
import { HttpCode } from "$/data/http_codes.ts";

export default async function UserPage(
  _req: Request,
  ctx: FreshContext<Session>
) {
  const session = ctx.state;
  if (!session?.id) {
    return Response.redirect(
      "http://localhost:8000/auth/login",
      HttpCode.SeeOther
    );
  }

  const username = ctx.params.username;

  const resp = await fetch(`http://localhost:8000/api/v0.1/user/${username}`);
  if (resp.status !== HttpCode.Ok) {
    throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
  }

  const user = (await resp.json()) as User;

  console.log(JSON.stringify(user));

  return (
    <>
      <Head>
        <title>{username}</title>
      </Head>
      <main>
        <Header /* avatar */ />
        <div class="flex flex-col items-center m-4">
          <AvatarFull user={user} />
          <p class="text-2xl mt-4">{username}</p>
          {/* TODO: Add information about me */}
        </div>
      </main>
    </>
  );
}

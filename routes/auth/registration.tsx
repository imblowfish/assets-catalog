import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { Registration } from "$/islands/Registration.tsx";
import { FreshContext } from "$fresh/server.ts";
import { Session } from "$/data/database/database.ts";
import { HttpCode } from "$/data/http_codes.ts";

// FIXME: `Response.redirect` doesn't work without `async` here
export default async function RegistrationPage(_req: Request, ctx: FreshContext<Session>) {
  const session = ctx.state;
  if (session?.id) {
    return Response.redirect("http://localhost:8000/", HttpCode.SeeOther);
  }

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <main>
        <Header />
        <Registration />
      </main>
    </>
  );
}

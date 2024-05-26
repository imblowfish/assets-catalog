import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { Header } from "$/components/Header.tsx";
import { Registration } from "$/islands/Registration.tsx";
import { HttpCode } from "$/data/http_codes.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const session = ctx.state;
    if (session?.id) {
      return Response.redirect("http://localhost:8000/", HttpCode.SeeOther);
    }
    return ctx.render();
  },
};

export default function RegistrationPage() {
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

import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { Header } from "$/components/Header.tsx";
import { Login } from "$/islands/Login.tsx";
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

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <Header />
        <Login />
      </main>
    </>
  );
}

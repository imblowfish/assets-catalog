import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { AvatarFull } from "$/components/Avatar.tsx";

export default defineRoute((_req, ctx) => {
  const username = ctx.params.username;

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <main>
        <Header /* avatar */ />
        <div class="flex flex-col items-center m-4">
          <AvatarFull />
          <p class="text-2xl mt-4">Full Name</p>
          <p class="text-lg">{username}</p>
        </div>
      </main>
    </>
  );
});

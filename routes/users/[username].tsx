import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { Avatar } from "$/components/Avatar.tsx";

export default defineRoute((_req, ctx) => {
  const username = ctx.params.username;

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>
      <main>
        <Header avatar />
        <div class="flex flex-col items-center m-4">
          {/* TODO: It doesn't work anymore with tailwind, I should remove all `sx` options */}
          <Avatar sx="w-40 h-40" />
          <p class="text-2xl mt-4">Full Name</p>
          <p class="text-lg">{username}</p>
        </div>
      </main>
    </>
  );
});

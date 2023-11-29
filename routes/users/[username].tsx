import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { Avatar } from "$/components/Avatar.tsx";

export default defineRoute((_req, ctx) => {
  const username = ctx.params.username;

  return (
    <>
      <Header />
      <main class="h-full flex flex-col items-center m-4">
        <Avatar sx="w-40 h-40" />
        <p class="text-2xl mt-4">Full Name</p>
        <p class="text-lg">{username}</p>
      </main>
    </>
  );
});

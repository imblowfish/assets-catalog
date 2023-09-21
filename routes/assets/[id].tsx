import { defineRoute } from "$fresh/src/server/defines.ts";
import IconX from "icons/x.tsx";
import { Asset, Database } from "$/data/database.ts";

export default defineRoute(async (_req: Request, ctx) => {
  const id = ctx.params.id;
  const entry = await Database.get(["assets", ctx.params.id]);

  if (!entry.value) {
    return ctx.renderNotFound();
  }

  const asset = entry.value as Asset;

  return (
    <div class="w-screen h-screen grid grid-cols-4">
      <div class="col-span-3 flex justify-center select-none bg-gray-800">
        <img
          class="h-screen"
          src={`/api/v0/assets/preview/${id}`}
        />
      </div>
      <div class="col-span-1 flex flex-col m-4">
        <a
          class="self-end"
          href={"/"}
        >
          <IconX class="w-8 h-8" />
        </a>
        <p class="text-3xl">{asset.title}</p>
        <p class="text-lg">{asset.description}</p>
      </div>
    </div>
  );
});

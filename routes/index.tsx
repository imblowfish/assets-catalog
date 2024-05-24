import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import {
  GalleryGrid,
  GalleryGridItem,
  // GalleryGridItem,
  // GalleryGridItemV2,
} from "$/components/GalleryGrid.tsx";
// import { Button } from "$/components/Button.tsx";
import { FreshContext } from "$fresh/server.ts";
import { Asset, Session } from "$/data/database/database.ts";
import { HttpCode } from "$/data/http_codes.ts";

export default async function Home(_req: Request, ctx: FreshContext<Session>) {
  const session = ctx.state;
  if (!session?.id) {
    return Response.redirect(
      "http://localhost:8000/auth/login",
      HttpCode.SeeOther
    );
  }

  const resp = await fetch(
    `http://localhost:8000/api/v0.1/user/${session.username}/assets`
  );
  if (resp.status !== HttpCode.Ok) {
    throw new Error(
      `API returned error [${resp.status}]: ${await resp.text()}`
    );
  }

  const assets = (await resp.json()) as Asset[];

  console.log(assets);

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <main>
        <Header
          // search
          // actions
          // avatar
        />
        {/* <p class="text-2xl ml-4 mt-4">Pinned</p>
        <GalleryGrid sx="gap-1 ml-4">{images}</GalleryGrid>
        <p class="text-2xl ml-4 mt-12">Recently viewed</p> */}
        <GalleryGrid sx="gap-1 ml-4">
          {assets.map((asset) => (
            <GalleryGridItem
              key={asset.id}
              id={asset.id}
              title={asset.title}
              // author="Some author"
              thumbnailUrl={`${asset.url}`}
            />
          ))}
        </GalleryGrid>
        <div class="flex flex-col items-center m-4">
          {assets.length === 0 && <p>No assets yet</p>}
          {/* <Button>Show all</Button> */}
        </div>
      </main>
    </>
  );
}

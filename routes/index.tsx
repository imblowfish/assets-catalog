import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import {
  GalleryGrid,
  GalleryGridItem,
  // GalleryGridItem,
  // GalleryGridItemV2,
} from "$/components/GalleryGrid.tsx";
import { Button } from "$/components/Button.tsx";
import { AssetData } from "$/data/database.ts";

export default async function Home() {
  let assets: AssetData[] = [];

  const resp = await fetch("http://localhost:8000/api/v0/assets");
  if (resp.status === 200) {
    assets = await resp.json();
  } else {
    console.error(`API returned ${resp.status}: ${await resp.text()}`);
  }

  const images = [];

  for (const asset of assets) {
    images.push(
      <GalleryGridItem
        key={asset.id}
        id={asset.id}
        title={asset.title}
        // author="Some author"
        thumbnailUrl={`${asset.url}`}
      />,
    );
  }

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <main>
        <Header
          // search
          actions
          // avatar
        />
        {
          /* <p class="text-2xl ml-4 mt-4">Pinned</p>
        <GalleryGrid sx="gap-1 ml-4">{images}</GalleryGrid>
        <p class="text-2xl ml-4 mt-12">Recently viewed</p> */
        }
        <GalleryGrid sx="gap-1 ml-4">{images}</GalleryGrid>
        <div class="flex flex-col items-center m-4">
          <Button>Show all</Button>
        </div>
      </main>
    </>
  );
}

import { Head } from "$fresh/runtime.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import { UploadButton } from "$/islands/UploadButton.tsx";
import { AssetsGrid } from "$/components/AssetsGrid.tsx";
import { Asset, Database } from "$/data/database.ts";

const SearchButton = () => {
  return (
    <div class="border(gray-500 2) h-8 w-min flex flex-row rounded space-x-2">
      <IconSearch class="h-full" />
      <input
        class="h-full outline-0"
        placeholder="Search..."
      />
    </div>
  );
};

const Header = () => {
  return (
    <div class="flex flex-col border">
      <div class="flex flex-row justify-start content-center items-center space-x-4">
        <img
          class="w-15 ml-8 mr-0 m-4"
          src="/logo.svg"
        />
        <p class="font-bold">Assets Catalog</p>
        <SearchButton />
        <UploadButton class="col-span-2" />
      </div>
    </div>
  );
};

export default async function Home() {
  const assets: Asset[] = [];

  for await (const entry of await Database.list({ prefix: ["assets"] })) {
    assets.push(entry.value as Asset);
  }

  return (
    <>
      <Head>
        <title>Assets Catalog</title>
      </Head>
      <main class="h-screen">
        <Header />
        <AssetsGrid assets={assets} />
      </main>
    </>
  );
}

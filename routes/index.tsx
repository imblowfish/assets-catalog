import { Head } from "$fresh/runtime.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import { UploadButton } from "$/islands/UploadButton.tsx";

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

const AssetCard = () => {
  return (
    <div class="select-none cursor-pointer flex flex-col border(gray-300 2) rounded-md">
      <img
        class="aspect-square overflow-hidden"
        src={"/logo.svg"}
      />
      <p class="ml-4 py-2 text-gray-800">Some image title</p>
    </div>
  );
};

const AssetsGrid = () => {
  const cards = [];

  for (let i = 1; i <= 10; i++) {
    cards.push(<AssetCard key={i} />);
  }

  return <div class="p-3 grid grid-cols-8 gap-2">{cards}</div>;
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Assets Catalog</title>
      </Head>
      <main class="h-screen">
        <Header />
        <AssetsGrid />
      </main>
    </>
  );
}

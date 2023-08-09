import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";
import IconUpload from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/upload.tsx";

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

const UploadButton = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      class="flex flex-row cursor-pointer rounded bg-blue-300 hover:bg-blue-400 px-3 py-2"
    >
      <IconUpload />
      Upload
    </button>
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
  const images = [
    "/abstraction.jpg",
    "/beach.jpg",
    "/room.jpg",
    "/sea.jpg",
  ];

  const titles = [
    "Beautiful beach",
    "Calm mountains",
    "Abstract figure",
    "Deep blue Sea",
  ];

  const imageRandomIdx = Math.floor(Math.random() * images.length);
  const titleRandomIdx = Math.floor(Math.random() * titles.length);

  return (
    <div class="select-none brightness-90 cursor-pointer flex flex-col border(gray-300 2) rounded-md hover:brightness-100">
      <img
        class="aspect-square overflow-hidden"
        src={images[imageRandomIdx]}
      />
      <p class="ml-4 py-2 text-gray-800">{titles[titleRandomIdx]}</p>
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

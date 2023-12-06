import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import {
  GalleryGrid,
  GalleryGridItem,
  GalleryGridItemV2,
} from "$/components/GalleryGrid.tsx";
import { Button } from "$/components/Button.tsx";

export default function Home() {
  const count = 10;
  const testImages = [
    "/logo.svg",
    "/test_pattern_high.jpg",
    "/test_pattern_low.png",
  ];

  const images = [];
  const imagesV2 = [];

  for (let i = 0; i < count; i++) {
    const randomImage = Math.floor(Math.random() * testImages.length);

    images.push(
      <GalleryGridItem
        key={i}
        thumbnailUrl={testImages[randomImage]}
      />,
    );

    imagesV2.push(
      <GalleryGridItemV2
        key={i}
        thumbnailUrl={testImages[randomImage]}
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
          search
          actions
          avatar
        />
        <p class="text-2xl ml-4 mt-4">Pinned</p>
        <GalleryGrid sx="gap-1 ml-4">{images}</GalleryGrid>
        <p class="text-2xl ml-4 mt-12">Recently viewed</p>
        <GalleryGrid sx="gap-1 ml-4">{imagesV2}</GalleryGrid>
        <div class="flex flex-col items-center m-4">
          <Button>Show all</Button>
        </div>
      </main>
    </>
  );
}

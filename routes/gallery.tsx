import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { GalleryGrid, GalleryGridItem } from "$/components/GalleryGrid.tsx";

export default defineRoute((_req, _ctx) => {
  const count = 1000;
  const testImages = [
    "/logo.svg",
    "/test_pattern_high.jpg",
    "/test_pattern_low.png",
  ];

  const images = [];

  for (let i = 0; i < count; i++) {
    const randomImage = Math.floor(Math.random() * testImages.length);

    images.push(
      <GalleryGridItem
        key={i}
        thumbnailUrl={testImages[randomImage]}
      />,
    );
  }

  return (
    <>
      <Header />
      <main class="h-full">
        <GalleryGrid sx="gap-1 m-4">{images}</GalleryGrid>
      </main>
    </>
  );
});

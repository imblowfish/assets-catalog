import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";

interface AssetProps {
  url: string;
  maxHeight: string;
}

const Asset = (props: AssetProps) => {
  return (
    <div
      class="flex"
      style={{ maxHeight: props.maxHeight }}
    >
      <img
        class="object-contain"
        src={props.url}
      />
    </div>
  );
};

interface AssetsListViewer {
  maxHeightPerAsset: string;
  sx?: string;
}

const AssetsList = (props: AssetsListViewer) => {
  return (
    <div class={`bg-black flex flex-col items-center gap-2 ${props.sx}`}>
      <Asset
        url="/test_asset_0.jpg"
        maxHeight={props.maxHeightPerAsset}
      />
      <Asset
        url="/test_asset_1.jpg"
        maxHeight={props.maxHeightPerAsset}
      />
    </div>
  );
};

interface SidebarProps {
  height: string;
  sx?: string;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div
      class={`sticky overflow-auto ${props.sx}`}
      style={{ height: props.height }}
    >
      Sidebar
      <p>title, info, comments etc.</p>
    </div>
  );
};

export default defineRoute((_req, ctx) => {
  const _assetId = ctx.params.assetId;

  return (
    <>
      <Head>
        <title>Asset page</title>
      </Head>
      <main>
        <Header avatar />
        <div class="grid grid-cols-4">
          <AssetsList
            sx="col-span-3"
            maxHeightPerAsset="calc(100vh - 64px)"
          />
          <Sidebar
            sx="top-16"
            height="calc(100vh - 64px)"
          />
        </div>
      </main>
    </>
  );
});

import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { Asset } from "$/islands/Asset.tsx";
import { Sidebar } from "$/islands/Sidebar.tsx";

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

export default defineRoute((_req, ctx) => {
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
            assetId={ctx.params.assetId}
          />
        </div>
      </main>
    </>
  );
});

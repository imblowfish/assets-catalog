import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { AssetData } from "$/data/database.ts";
import { Asset } from "$/islands/Asset.tsx";
import { Sidebar } from "$/islands/Sidebar.tsx";

interface AssetsListViewer {
  maxHeightPerAsset: string;
  sx?: string;
  assetData: AssetData;
}

const AssetsList = (props: AssetsListViewer) => {
  return (
    <div class={`bg-black flex flex-col items-center gap-2 ${props.sx}`}>
      <Asset
        url={props.assetData.url}
        maxHeight={props.maxHeightPerAsset}
      />
      {
        /* <Asset
        url="/test_asset_1.jpg"
        maxHeight={props.maxHeightPerAsset}
      /> */
      }
    </div>
  );
};

export default defineRoute(async (_req, ctx) => {
  const resp = await fetch(
    `http://localhost:8000/api/v0/assets/${ctx.params.assetId}`,
  );

  if (resp.status !== 200) {
    console.error(`API returned ${resp.status}: ${await resp.text()}`);
    return;
  }

  const asset = await resp.json() as AssetData;

  return (
    <>
      <Head>
        <title>Assets catalog - {asset.title}</title>
      </Head>
      <main>
        <Header avatar />
        <div class="grid grid-cols-4">
          <AssetsList
            sx="col-span-3"
            maxHeightPerAsset="calc(100vh - 64px)"
            assetData={asset}
          />
          <Sidebar
            sx="top-16"
            height="calc(100vh - 64px)"
            assetData={asset}
          />
        </div>
      </main>
    </>
  );
});

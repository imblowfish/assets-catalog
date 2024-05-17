import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { Header } from "$/components/Header.tsx";
import { AssetData } from "$/data/database.ts";
import { AssetView } from "$/islands/AssetView.tsx";

export default defineRoute(async (_req, ctx) => {
  const resp = await fetch(
    `http://localhost:8000/api/v0/assets/${ctx.params.assetId}`,
  );

  if (resp.status !== 200) {
    console.error(`API returned ${resp.status}: ${await resp.text()}`);
    return;
  }

  const asset = (await resp.json()) as AssetData;

  return (
    <>
      <Head>
        <title>Assets catalog - {asset.title}</title>
      </Head>
      <main>
        <Header /* avatar */ />
        <AssetView {...asset} />
      </main>
    </>
  );
});

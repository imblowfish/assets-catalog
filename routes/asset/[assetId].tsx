import { Head } from "$fresh/runtime.ts";
import { Header } from "$/components/Header.tsx";
import { AssetData } from "$/data/database.ts";
import { AssetView } from "$/islands/AssetView.tsx";
import { FreshContext } from "$fresh/server.ts";
import { Asset, Session, User } from "$/data/database/database.ts";
import { HttpCode } from "$/data/http_codes.ts";

export default async function AssetPage(
  _req: Request,
  ctx: FreshContext<Session>,
) {
  const session = ctx.state;
  if (!session?.id) {
    return Response.redirect(
      "http://localhost:8000/auth/login",
      HttpCode.SeeOther,
    );
  }

  const assetId = ctx.params.assetId;

  let resp = await fetch(`http://localhost:8000/api/v0/asset/${assetId}`);
  if (resp.status !== HttpCode.Ok) {
    throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
  }

  const asset = (await resp.json()) as Asset;

  resp = await fetch(`http://localhost:8000/api/v0/user/${asset.username}`);
  if (resp.status !== HttpCode.Ok) {
    throw new Error(`API returned [${resp.status}]: ${await resp.text()}`);
  }

  const user = (await resp.json()) as User;

  return (
    <>
      <Head>
        <title>Assets catalog - {asset.title}</title>
      </Head>
      <main>
        <Header user={user} />
        <AssetView {...asset} />
      </main>
    </>
  );
};

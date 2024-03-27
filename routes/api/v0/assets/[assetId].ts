import { Handlers } from "$fresh/server.ts";
import { Database } from "$/data/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const assetId = ctx.params.assetId;
    const asset = await Database.get(["assets", assetId]);

    if (!asset.value) {
      return new Response(
        JSON.stringify({
          message: `Can't find asset with id '${assetId}'`,
        }),
        {
          status: 404,
        },
      );
    }

    return new Response(JSON.stringify(asset.value), {
      status: 200,
    });
  },

  async PATCH(req, ctx) {
    const assetId = ctx.params.assetId;
    const assetKey = ["assets", assetId];
    const assetChanges = (await req.json()) as {
      title: string;
      description: string;
    };
    const asset = await Database.get(assetKey);

    if (!asset.value) {
      return new Response(
        JSON.stringify({
          message: `Can't find asset with id '${assetId}'`,
        }),
        {
          status: 404,
        },
      );
    }

    const modifiedAsset = {
      ...asset.value,
      ...assetChanges,
    };

    const ok = await Database.atomic()
      .check(asset)
      .set(assetKey, modifiedAsset)
      .commit();

    if (!ok) {
      return new Response(
        JSON.stringify({ message: "Error with atomic operation" }),
        {
          status: 500,
        },
      );
    }

    return new Response(JSON.stringify(modifiedAsset), {
      status: 200,
    });
  },

  async DELETE(_req, ctx) {
    const assetId = ctx.params.assetId;
    const assetKey = ["assets", assetId];
    const asset = await Database.get(assetKey);

    if (!asset.value) {
      return new Response(
        JSON.stringify({ message: `Can't find asset with id '${assetId}'` }),
        {
          status: 404,
        },
      );
    }

    const ok = await Database.atomic().check(asset).delete(assetKey).commit();

    if (!ok) {
      return new Response(
        JSON.stringify({ message: "Error with atomic operation" }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({ message: `Asset '${assetId}' deleted` }),
      {
        status: 200,
      },
    );
  },
};

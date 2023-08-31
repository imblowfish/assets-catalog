import { Handlers } from "$fresh/server.ts";
import { Database } from "$/data/database.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const asset = await Database.get(["assets", id]);

    if (!asset.value) {
      return new Response(`Can't find asset with id '${id}'`, {
        status: 404,
      });
    }

    return new Response(JSON.stringify(asset.value), {
      status: 200,
    });
  },

  async PUT(req, ctx) {
    const id = ctx.params.id;
    const assetKey = ["assets", id];
    const assetChanges = (await req.json()) as {
      title: string;
      description: string;
    };
    const asset = await Database.get(assetKey);

    if (!asset.value) {
      return new Response(`Can't find asset with id '${id}'`, {
        status: 404,
      });
    }

    const modifiedAsset = {
      ...asset.value,
      ...assetChanges,
    };

    const ok = await Database.atomic().check(asset).set(assetKey, modifiedAsset)
      .commit();

    if (!ok) {
      return new Response("Error with atomic operation", {
        status: 500,
      });
    }

    return new Response(JSON.stringify(modifiedAsset), {
      status: 200,
    });
  },

  async DELETE(_req, ctx) {
    const id = ctx.params.id;
    const assetKey = ["assets", id];
    const asset = await Database.get(assetKey);

    if (!asset.value) {
      return new Response(`Can't find asset with id '${id}'`, {
        status: 404,
      });
    }

    const ok = await Database.atomic().check(asset).delete(assetKey).commit();

    if (!ok) {
      return new Response("Error with atomic operation", {
        status: 500,
      });
    }

    return new Response(`Asset '${id}' deleted`, {
      status: 200,
    });
  },
};

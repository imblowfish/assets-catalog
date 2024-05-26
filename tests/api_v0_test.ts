// import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
// import type { Asset } from "$/data/database/database.ts";
// import manifest from "$/fresh.gen.ts";
// import {
//   assertEquals,
//   assertExists,
//   assertInstanceOf,
//   assertMatch,
//   assertRejects,
// } from "$std/testing/asserts.ts";
// import * as path from "$std/path/mod.ts";

// const dirname = path.dirname(path.fromFileUrl(import.meta.url));
// const databasePath = Deno.env.get("DATABASE_PATH")!;

// const connectionInfo: ServeHandlerInfo = {
//   remoteAddr: {
//     hostname: "127.0.0.1",
//     port: 8000,
//     transport: "tcp",
//   },
// };

// Deno.test("/assets", async (t) => {
//   const testAssetTitle = "Test asset title";
//   const testAssetDescription = "Test asset description";
//   const testAssetUrl = "http://some-url/file.png";

//   const handler = await createHandler(manifest);

//   await t.step("Get assets when there are no any asset", async () => {
//     const resp = await handler(
//       new Request(`http://${connectionInfo.remoteAddr.hostname}/api/v0/assets`),
//       connectionInfo
//     );

//     assertEquals(resp.status, 200);
//     assertEquals(await resp.json(), []);
//   });

//   let asset: Asset | null = null;

//   await t.step("Add a new asset", async () => {
//     const bodyContent = new FormData();
//     bodyContent.append("title", testAssetTitle);
//     bodyContent.append("description", testAssetDescription);
//     bodyContent.append("url", testAssetUrl);

//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets`,
//         {
//           method: "POST",
//           body: bodyContent,
//         }
//       ),
//       connectionInfo
//     );

//     const jsonResp = (await resp.json()) as Asset;

//     assertEquals(resp.status, 200);
//     assertExists(jsonResp.id);
//     assertEquals(jsonResp.title, testAssetTitle);
//     assertEquals(jsonResp.description, testAssetDescription);
//     assertEquals(jsonResp.url, testAssetUrl);

//     asset = { ...jsonResp };
//   });

//   await t.step("Get when asset list is not empty", async () => {
//     const resp = await handler(
//       new Request(`http://${connectionInfo.remoteAddr.hostname}/api/v0/assets`),
//       connectionInfo
//     );

//     const jsonResp = await resp.json();

//     assertEquals(resp.status, 200);
//     assertInstanceOf(jsonResp, Array);
//     assertEquals(jsonResp.length, 1);
//     assertEquals(jsonResp[0], asset);
//   });

//   await t.step("Get specific asset by id", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 200);
//     assertEquals(await resp.json(), asset);
//   });

//   await t.step("Update asset by id", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`,
//         {
//           method: "PATCH",
//           body: JSON.stringify({
//             title: "New test asset title",
//             description: "New test asset description",
//           }),
//         }
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 200);
//     asset = (await resp.json()) as Asset;
//     assertEquals(asset.title, "New test asset title");
//     assertEquals(asset.description, "New test asset description");
//   });

//   // await t.step("Get asset preview by id", async () => {
//   //   const resp = await handler(
//   //     new Request(
//   //       `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/preview/${asset?.id}`,
//   //     ),
//   //     connectionInfo,
//   //   );

//   //   assertEquals(resp.status, 200);
//   // });

//   // await t.step("Get preview for a non-existent asset", async () => {
//   //   const resp = await handler(
//   //     new Request(
//   //       `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/preview/nonExistentId`,
//   //     ),
//   //     connectionInfo,
//   //   );

//   //   assertEquals(resp.status, 404);
//   // });

//   await t.step("Delete asset by id", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`,
//         { method: "DELETE" }
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 200);
//     assertEquals(await resp.json(), {
//       message: `Asset '${asset?.id}' deleted`,
//     });
//     await assertRejects(
//       () => {
//         return Deno.stat(`${Deno.env.get("STORAGE_PATH")!}/${asset?.id}`);
//       },
//       Error,
//       "No such file or directory"
//     );
//   });

//   await t.step("Get a non-existent asset", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 404);
//     assertEquals(await resp.json(), {
//       message: `Can't find asset with id '${asset?.id}'`,
//     });
//   });

//   await t.step("Update a non-existent asset", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`,
//         {
//           method: "PATCH",
//           body: JSON.stringify({
//             title: "New test asset title",
//             description: "New test asset description",
//           }),
//         }
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 404);
//     assertEquals(await resp.json(), {
//       message: `Can't find asset with id '${asset?.id}'`,
//     });
//   });

//   await t.step("Delete a non-existent asset", async () => {
//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/assets/${asset?.id}`,
//         { method: "DELETE" }
//       ),
//       connectionInfo
//     );

//     assertEquals(resp.status, 404);
//     assertEquals(await resp.json(), {
//       message: `Can't find asset with id '${asset?.id}'`,
//     });
//   });

//   Deno.remove(databasePath, { recursive: true });
// });

// Deno.test("/storage", async (t) => {
//   const testFile = new File(
//     [await Deno.readFile(`${dirname}/null.png`)],
//     `null.png`
//   );

//   const handler = await createHandler(manifest);

//   let savedFileUrl = "";

//   await t.step("Upload file to storage", async () => {
//     const formData = new FormData();
//     formData.append("file", testFile);

//     const resp = await handler(
//       new Request(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/storage`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       ),
//       connectionInfo
//     );

//     const jsonResp = (await resp.json()) as { url: string };
//     assertEquals(resp.status, 200);
//     assertMatch(
//       jsonResp.url,
//       new RegExp(
//         `http://${connectionInfo.remoteAddr.hostname}/api/v0/storage/.*_${testFile.name}`
//       )
//     );

//     savedFileUrl = jsonResp.url;
//     const savedFileName = jsonResp.url.split("/").at(-1);

//     const stat = await Deno.stat(
//       `${Deno.env.get("STORAGE_PATH")!}/${savedFileName}`
//     );
//     assertEquals(stat.isFile, true);
//   });

//   await t.step("Download file from storage", async () => {
//     const resp = await handler(
//       new Request(savedFileUrl, {
//         method: "GET",
//       }),
//       connectionInfo
//     );

//     assertEquals(resp.status, 200);
//   });
// });

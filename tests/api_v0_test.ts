import { createHandler, ServeHandlerInfo } from "$fresh/server.ts";
import manifest from "$/fresh.gen.ts";
import config from "$/fresh.config.ts";
import {
  assertEquals,
  assertExists,
  assertObjectMatch,
} from "$std/testing/asserts.ts";
import { ErrorCode } from "$/data/error_codes.ts";
import { HttpCode } from "$/data/http_codes.ts";
import { Asset } from "$/data/database/database.ts";
import { AssetCreationRequest } from "$/data/responses.ts";

const connectionInfo = {
  remoteAddr: {
    hostname: "127.0.0.1",
    port: 8000,
    transport: "tcp",
  },
} satisfies ServeHandlerInfo;

Deno.test("/asset", async (t) => {
  const handler = await createHandler(manifest, config);

  await t.step("GET", async (t) => {
    await t.step("Unknown asset", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/asset/${crypto.randomUUID()}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, 404);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_ASSET_NOT_FOUND,
      });
    });
  });

  await t.step("DELETE", async (t) => {
    await t.step("Unknown asset", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/asset/${crypto.randomUUID()}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.NotFound);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_ASSET_NOT_FOUND,
      });
    });
  });
});

Deno.test("/auth", async (t) => {
  const handler = await createHandler(manifest, config);

  const email = "username@example.com";
  const password = "testPassword123";
  const username = "testUsername";

  await t.step("/registration", async (t) => {
    await t.step("Correct registration", async () => {
      let resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.NotFound);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_USER_USERNAME_IS_UNKNOWN,
      });

      resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${
                btoa(
                  `${email}:${password}:${username}`,
                )
              }`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Created);

      resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Ok);
    });

    await t.step("Authorization header is empty", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.BadRequest);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_EMPTY,
      });
    });

    await t.step("Authorization header without email", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${password}:${username}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.BadRequest);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
      });
    });

    await t.step("Authorization header without password", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${email}:${username}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.BadRequest);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
      });
    });

    await t.step("Authorization header without username", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${email}:${password}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.BadRequest);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
      });
    });

    await t.step("Email already in use", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${
                btoa(
                  `${email}:${password}:${username}`,
                )
              }`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Conflict);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_EMAIL_ALREADY_IN_USE,
      });
    });

    await t.step("Username already in use", async () => {
      const modifiedEmail = `modified_${email}`;
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/registration`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${
                btoa(
                  `${modifiedEmail}:${password}:${username}`,
                )
              }`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Conflict);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_USERNAME_ALREADY_IN_USE,
      });
    });
  });

  await t.step("/login", async (t) => {
    await t.step("Correct login", async () => {
      let resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Ok);

      resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${email}:${password}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Ok);
    });

    await t.step("Authorization header is empty", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_EMPTY,
      });
    });

    await t.step("Authorization header without email", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${password}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
      });
    });

    await t.step("Authorization header without password", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${email}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT,
      });
    });

    await t.step("Unknown email", async () => {
      const modifiedEmail = `modified_${email}`;
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${modifiedEmail}:${password}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_EMAIL_UNKNOWN,
      });
    });

    await t.step("Unknown email", async () => {
      const modifiedEmail = `modified_${email}`;
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${modifiedEmail}:${password}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_EMAIL_UNKNOWN,
      });
    });

    await t.step("Incorrect password", async () => {
      const modifiedPassword = `modified_${password}`;
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${email}:${modifiedPassword}`)}`,
            },
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Unauthorized);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_AUTH_PASSWORD_IS_INCORRECT,
      });
    });
  });

  await t.step("/logout", async (t) => {
    await t.step("Correct logout", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/auth/logout`,
          {
            method: "POST",
          },
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.SeeOther);
    });
  });
});

Deno.test("/user", async (t) => {
  const handler = await createHandler(manifest, config);

  const username = "testUsername";

  await t.step("GET", async (t) => {
    await t.step("Correct request", async () => {
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.Ok);
    });

    await t.step("Unknown username", async () => {
      const modifiedUsername = `modified_${username}`;
      const resp = await handler(
        new Request(
          `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${modifiedUsername}`,
        ),
        connectionInfo,
      );

      assertEquals(resp.status, HttpCode.NotFound);
      assertEquals(await resp.json(), {
        message: ErrorCode.API_USER_USERNAME_IS_UNKNOWN,
      });
    });
  });

  await t.step("/[username]", async (t) => {
    const file = new File([new Uint8Array([20, 30])], "test-file-name");

    await t.step("/files", async (t) => {
      await t.step("POST", async () => {
        const formData = new FormData();
        formData.set("file", file);

        const resp = await handler(
          new Request(
            `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/files`,
            {
              method: "POST",
              body: formData,
            },
          ),
          connectionInfo,
        );
        assertEquals(resp.status, HttpCode.Created);
        assertObjectMatch(await resp.json(), {
          name: file.name,
          size: file.size,
        });
      });
    });

    await t.step("/file", async (t) => {
      await t.step("[filename]", async (t) => {
        await t.step("GET", async () => {
          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/file/${file.name}`,
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.Ok);
        });

        await t.step("DELETE", async () => {
          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/file/${file.name}`,
              {
                method: "DELETE",
              },
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.Ok);
        });
      });
    });

    await t.step("/assets", async (t) => {
      const assetTestData: AssetCreationRequest = {
        title: file.name,
        description: "Some test description",
        objectUrl: "http://test-host-object-url",
      };

      await t.step("POST", async (t) => {
        await t.step("Correct asset creation", async () => {
          let resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/file/${file.name}`,
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.Ok);

          resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/assets`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(assetTestData),
              },
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.Created);

          const asset = (await resp.json()) as Asset;
          assertExists(asset.id);
          assertObjectMatch(asset, {
            title: assetTestData.title,
            description: assetTestData.description,
            collectionId: "default",
            username: username,
            objectUrl: assetTestData.objectUrl,
          });
          assertExists(asset.url);
          assertExists(asset.htmlUrl);
        });

        await t.step("Unknown username", async () => {
          const modifiedUsername = `modified_${username}`;

          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${modifiedUsername}/assets`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(assetTestData),
              },
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.NotFound);
          assertEquals(await resp.json(), {
            message: ErrorCode.API_USER_USERNAME_IS_UNKNOWN,
          });
        });

        await t.step("Empty asset title", async () => {
          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/assets`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...assetTestData,
                  title: undefined,
                }),
              },
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.BadRequest);
          assertEquals(await resp.json(), {
            message: ErrorCode.API_ASSET_EMPTY_TITLE,
          });
        });

        await t.step("Empty objectUrl", async () => {
          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/assets`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...assetTestData,
                  objectUrl: undefined,
                }),
              },
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.BadRequest);
          assertEquals(await resp.json(), {
            message: ErrorCode.API_ASSET_OBJECT_URL_IS_EMPTY,
          });
        });
      });

      await t.step("GET", async (t) => {
        await t.step("Correct request", async () => {
          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${username}/assets`,
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.Ok);

          const assets = (await resp.json()) as Asset[];
          assertEquals(assets.length, 1);
          const asset = assets[0];
          assertExists(asset.id);
          assertObjectMatch(asset, {
            title: assetTestData.title,
            description: assetTestData.description,
            collectionId: "default",
            username: username,
            objectUrl: assetTestData.objectUrl,
          });
          assertExists(asset.url);
          assertExists(asset.htmlUrl);
        });

        await t.step("Unknown username", async () => {
          const modifiedUsername = `modified_${username}`;

          const resp = await handler(
            new Request(
              `http://${connectionInfo.remoteAddr.hostname}/api/v0/user/${modifiedUsername}/assets`,
            ),
            connectionInfo,
          );

          assertEquals(resp.status, HttpCode.NotFound);
          assertEquals(await resp.json(), {
            message: ErrorCode.API_USER_USERNAME_IS_UNKNOWN,
          });
        });
      });
    });
  });
});

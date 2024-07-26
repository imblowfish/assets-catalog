/// <reference lib="deno.unstable" />
import type {
  Asset,
  DatabaseBackend,
  Session,
  User,
  UserUnsafe,
} from "$/data/database/backend/db_api.ts";

const databasePath = Deno.env.get("DATABASE_PATH");

console.log("DenoKv database initialized");
console.log(`DATABASE_PATH=${databasePath}`);

const kv = await Deno.openKv(databasePath);

async function insertUser(user: UserUnsafe) {
  const primaryKey = ["users", user.id];
  const byEmailKey = ["users_by_email", user.email];
  const byUsernameKey = ["users_by_username", user.username];

  await kv
    .atomic()
    .check({
      key: primaryKey,
      versionstamp: null,
    })
    .check({
      key: byEmailKey,
      versionstamp: null,
    })
    .check({
      key: byUsernameKey,
      versionstamp: null,
    })
    .set(primaryKey, user)
    .set(byEmailKey, user)
    .set(byUsernameKey, user)
    .commit();
}

async function getUserByUserId(userId: string) {
  const primaryKey = ["users", userId];
  const user = (await kv.get<User>(primaryKey)).value as User | null;
  if (!user) {
    return user;
  }
  return {
    ...user,
    password: undefined,
    email: undefined,
  } as User;
}

async function getUserByEmailUnsafe(email: string) {
  const byEmailKey = ["users_by_email", email];
  return (await kv.get<UserUnsafe>(byEmailKey)).value as UserUnsafe | null;
}

async function getUserByUsername(username: string) {
  const byUsernameKey = ["users_by_username", username];
  const user = (await kv.get<User>(byUsernameKey)).value as User | null;
  if (!user) {
    return user;
  }
  return {
    ...user,
    password: undefined,
    email: undefined,
  } as User;
}

async function insertSession(session: Session) {
  const primaryKey = ["sessions", session.id];
  await kv
    .atomic()
    .check({
      key: primaryKey,
      versionstamp: null,
    })
    .set(primaryKey, session)
    .commit();
}

async function getSessionBySessionId(sessionId: string) {
  const primaryKey = ["sessions", sessionId];
  return (await kv.get<Session>(primaryKey)).value as Session | null;
}

async function deleteSession(sessionId: string) {
  const primaryKey = ["sessions", sessionId];
  await kv.delete(primaryKey);
}

async function insertAsset(asset: Asset) {
  const primaryKey = ["assets", asset.id];
  const byUserIdKey = ["assets_by_username", asset.username, asset.id];
  const byCollectionIdKey = [
    "assets_by_collection_id",
    asset.collectionId,
    asset.id,
  ];

  await kv
    .atomic()
    .check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, asset)
    .set(byUserIdKey, asset)
    .set(byCollectionIdKey, asset)
    .commit();
}

async function deleteAsset(assetId: string) {
  const asset = await getAssetByAssetId(assetId);
  if (!asset) {
    return;
  }
  const primaryKey = ["assets", assetId];
  const byUserIdKey = ["assets_by_username", asset.username, assetId];
  const byCollectionIdKey = [
    "assets_by_collection_id",
    asset.collectionId,
    assetId,
  ];

  await kv
    .atomic()
    .delete(primaryKey)
    .delete(byUserIdKey)
    .delete(byCollectionIdKey)
    .commit();
}

async function getAssetByAssetId(assetId: string) {
  const primaryKey = ["assets", assetId];
  return (await kv.get<Asset>(primaryKey)).value as Asset | null;
}

async function getAssetsByUsername(username: string) {
  const byUserIdKey = ["assets_by_username", username];
  const assets = (
    await Array.fromAsync(
      kv.list<Asset>({
        prefix: byUserIdKey,
      }),
    )
  ).map((record) => record.value);
  return assets;
}

export const databaseBackend = {
  version: "v0.0.0",
  users: {
    insert: insertUser,
    get: {
      byUserId: getUserByUserId,
      byUsername: getUserByUsername,
    },
    unsafe: {
      get: {
        byEmail: getUserByEmailUnsafe,
      },
    },
  },
  sessions: {
    insert: insertSession,
    delete: deleteSession,
    get: {
      bySessionId: getSessionBySessionId,
    },
  },
  assets: {
    insert: insertAsset,
    delete: deleteAsset,
    get: {
      byAssetId: getAssetByAssetId,
      byUsername: getAssetsByUsername,
    },
  },
} satisfies DatabaseBackend;

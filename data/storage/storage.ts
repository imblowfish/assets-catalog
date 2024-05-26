import type { StorageObject } from "$/data/storage/backend/storage_api.ts";

const storage = (await import("$/data/storage/backend/storage_fs.ts"))
  .storageBackend;

export { storage as Storage, StorageObject };

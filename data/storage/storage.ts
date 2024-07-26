import type {
  StorageBackend,
  StorageObject,
} from "$/data/storage/backend/storage_api.ts";

const storageEngine = Deno.env.get("STORAGE_ENGINE");

let storage: StorageBackend;

switch (storageEngine) {
  case "Fs":
    storage = (await import("$/data/storage/backend/storage_fs.ts"))
      .storageBackend;
    break;
  case "Fake":
    storage = (await import("$/data/storage/backend/storage_fake.ts"))
      .storageBackend;
    break;
  default:
    throw new Error(`Unknown storage backend ${storageEngine}`);
}

export { storage as Storage, StorageObject };

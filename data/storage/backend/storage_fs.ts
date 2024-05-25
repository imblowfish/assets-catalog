import { load } from "$std/dotenv/mod.ts";
import {
  StorageBackend,
  StorageBucket,
  StorageObject,
} from "$/data/storage/backend/storage_api.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const storagePath = Deno.env.get("STORAGE_PATH") || config["STORAGE_PATH"];

console.log("Storage initialization");
console.log(`STORAGE_PATH=${storagePath}`);

await Deno.mkdir(storagePath, {
  recursive: true,
});

async function createBucket(bucket: StorageBucket) {
  await Deno.mkdir(`${storagePath}/${bucket.name}`, {
    recursive: true,
  });
}

async function createObject(object: StorageObject) {
  const path = `${storagePath}/${object.bucket}`;
  await Deno.mkdir(path, {
    recursive: true,
  });
  await Deno.writeFile(`${path}/${object.name}`, object.data);
}

async function getObject(bucketName: string, name: string) {
  const path = `${storagePath}/${bucketName}`;
  const objectData = await Deno.readFile(`${path}/${name}`);
  return objectData;
}

async function deleteObject(bucketName: string, name: string) {
  const path = `${storagePath}/${bucketName}`;
  await Deno.remove(`${path}/${name}`);
}

export const storageBackend = {
  version: "v0.0.0",
  bucket: {
    create: createBucket,
  },
  object: {
    create: createObject,
    get: getObject,
    delete: deleteObject,
  },
} satisfies StorageBackend;

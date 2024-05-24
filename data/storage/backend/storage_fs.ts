import { load } from "$std/dotenv/mod.ts";
import {
  StorageBackend,
  StorageObject,
} from "$/data/storage/backend/storage_api.ts";

const config = await load({
  envPath: ".env",
  defaultsPath: ".env.defaults",
  examplePath: ".env.example",
  export: true,
});

const defaultBucketName = "default";

const storagePath = Deno.env.get("STORAGE_PATH") || config["STORAGE_PATH"];

console.log("Storage initialization");
console.log(`STORAGE_PATH=${storagePath}`);

await Deno.mkdir(storagePath, {
  recursive: true,
});

async function createObject(object: StorageObject) {
  const bucketName = defaultBucketName;
  const path = `${storagePath}/${bucketName}`;
  await Deno.mkdir(`${storagePath}/${bucketName}`, {
    recursive: true,
  });
  await Deno.writeFile(`${path}/${object.name}`, object.data);
}

async function getObject(name: string) {
  const bucketName = defaultBucketName;
  const path = `${storagePath}/${bucketName}`;
  const objectData = await Deno.readFile(`${path}/${name}`);
  return objectData;
}

async function deleteObject(name: string) {
  const bucketName = defaultBucketName;
  const path = `${storagePath}/${bucketName}`;
  await Deno.remove(`${path}/${name}`);
}

export const storageBackend = {
  version: "v0.0.0",
  object: {
    create: createObject,
    get: getObject,
    delete: deleteObject,
  },
} satisfies StorageBackend;

import type {
  StorageBackend,
  StorageBucket,
  StorageObject,
} from "$/data/storage/backend/storage_api.ts";

interface FakeStorage {
  buckets: StorageBucket[];
  objects: StorageObject[];
}

const fakeStorage: FakeStorage = {
  buckets: [],
  objects: [],
};

console.log("Fake storage initialized");

function createBucket(bucket: StorageBucket) {
  fakeStorage.buckets.push(bucket);

  return new Promise<void>((resolve) => {
    resolve();
  });
}

function createObject(object: StorageObject) {
  fakeStorage.objects.push(object);

  return new Promise<void>((resolve) => {
    resolve();
  });
}

function getObject(bucketName: string, name: string) {
  for (const object of fakeStorage.objects) {
    if (object.bucket === bucketName && object.name === name) {
      return new Promise<Uint8Array>((resolve) => {
        resolve(object.data);
      });
    }
  }
  return new Promise<Uint8Array>((resolve) => {
    resolve(new Uint8Array());
  });
}

function deleteObject(bucketName: string, name: string) {
  const index = fakeStorage.objects.findIndex((object) => {
    return object.bucket === bucketName && object.name === name;
  });
  fakeStorage.objects.splice(index, 1);

  return new Promise<void>((resolve) => {
    resolve();
  });
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

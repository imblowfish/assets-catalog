export interface StorageBucket {
  name: string;
}

export interface StorageObject {
  bucket: string;
  name: string;
  data: Uint8Array;
}

export interface StorageBackend {
  version: string;
  bucket: {
    create: (bucket: StorageBucket) => Promise<void>;
  }
  object: {
    create: (object: StorageObject) => Promise<void>;
    get: (bucketName: string, name: string) => Promise<Uint8Array>;
    delete: (bucketName: string, name: string) => Promise<void>;
  }
}

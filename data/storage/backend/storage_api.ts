export interface StorageObject {
  name: string;
  data: Uint8Array;
}

export interface StorageBackend {
  version: string;
  object: {
    create: (object: StorageObject) => Promise<void>;
    get: (name: string) => Promise<Uint8Array>;
    delete: (name: string) => Promise<void>;
  }
}

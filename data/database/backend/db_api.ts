export interface UserUnsafe {
  id: string;
  email: string;
  username: string;
  password: string;
  url: string;
  htmlUrl: string;
}

export type User = Omit<UserUnsafe, "password" | "email">;

export interface Session {
  id: string;
  username: string;
  // TODO: Add session expiration
}

export interface Asset {
  id: string;
  username: string;
  collectionId: string;
  title: string;
  description: string;
  objectUrl: string;
  url: string;
  htmlUrl: string;
}

export interface DatabaseBackend {
  version: string;
  users: {
    insert: (user: UserUnsafe) => Promise<void>;
    get: {
      byUserId: (userId: string) => Promise<User | null>;
      byUsername: (username: string) => Promise<User | null>;
    };
    unsafe: {
      get: {
        byEmail: (email: string) => Promise<UserUnsafe | null>;
      };
    };
  };
  sessions: {
    insert: (session: Session) => Promise<void>;
    delete: (sessionId: string) => Promise<void>;
    get: {
      bySessionId: (sessionId: string) => Promise<Session | null>;
    };
  };
  assets: {
    insert: (asset: Asset) => Promise<void>;
    get: {
      byUsername: (username: string) => Promise<Asset[]>;
    };
  };
}

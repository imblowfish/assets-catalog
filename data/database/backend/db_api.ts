export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface Session {
  id: string;
  userId: string;
  // TODO: Add session expiration
}

export interface Asset {
  id: string;
  userId: string;
  collectionId: string;
  title: string;
  description: string;
  url: string;
}

export interface DatabaseBackend {
  version: string;
  users: {
    insert: (user: User) => Promise<void>;
    get: {
      byUserId: (userId: string) => Promise<User | null>;
      byEmail: (email: string) => Promise<User | null>;
      byUsername: (username: string) => Promise<User | null>;
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
      byUserId: (userId: string) => Promise<Asset[]>;
    }
  };
}

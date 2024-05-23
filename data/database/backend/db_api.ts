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

export interface DatabaseBackend {
  insertUser: (user: User) => Promise<void>;
  getUserByEmail: (email: string) => Promise<User | null>;
  getUserByUsername: (username: string) => Promise<User | null>;

  insertSession: (session: Session) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
}

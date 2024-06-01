export interface InternalUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface PublicUser {
  id: number;
  username: string;
  email: string;
}

export interface User extends PublicUser {
  password: string;
}

export type Credential = {
  email: string;
  password: string;
};

export type UserResponse = {
  userId: number;
  email: string;
};

export type Task = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Csrf = {
  csrf_token: string;
};

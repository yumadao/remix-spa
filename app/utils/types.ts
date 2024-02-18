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
  createdAt: Date;
  updatedAt: Date;
};

export type Csrf = {
  csrf_token: string;
};

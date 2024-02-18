import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserState = {
  email?: string;
  password?: string;
};

type Task = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

type Action = {
  clearUserState: VoidFunction;
  updateUserState: (user: UserState) => void;
};

export const useStore = create<UserState & Action>()(
  persist(
    (set) => ({
      password: undefined,
      email: undefined,
      clearUserState: () =>
        set(() => ({
          password: undefined,
          email: undefined,
        })),
      updateUserState: (user) =>
        set(() => ({
          password: user.password,
          email: user.email,
        })),
    }),
    {
      name: "user",
    }
  )
);

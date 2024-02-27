import { Credential, Csrf, Task, UserResponse } from "./types";
import axios, { AxiosError } from "axios";

export const baseUrl = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
  withCredentials: true,
});

export const getCsrfToken = async (): Promise<Csrf> => {
  try {
    const { data } = await axiosInstance.get<Csrf>("/csrf");
    axiosInstance.defaults.headers.common["X-CSRF-Token"] = data.csrf_token;
    console.log(data.csrf_token, axiosInstance.defaults.headers);
    return data;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const signup = async ({
  email,
  password,
}: Credential): Promise<UserResponse> => {
  try {
    const { data } = await axiosInstance.post<UserResponse>("/signup", {
      email,
      password,
    });
    return data;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const login = async ({ email, password }: Credential) => {
  try {
    await axiosInstance.post("/login", { email, password });
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axiosInstance.get<Task[]>("/tasks");
    return data;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const getTaskById = async (taskId: number): Promise<Task> => {
  try {
    const { data } = await axiosInstance.get<Task>(`/tasks/${taskId}`);
    return data;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};
export const createTask = async (title: string): Promise<Task> => {
  try {
    const { data } = await axiosInstance.post<Task>("/tasks", {
      title,
    });
    return data;
  } catch (err) {
    console.log(axiosInstance.defaults.headers);
    throw new Error((err as AxiosError).message);
  }
};
export const updateTask = async (
  taskId: number,
  title: string
): Promise<Task> => {
  try {
    const { data } = await axiosInstance.put<Task>(`/tasks/${taskId}`, {
      title,
    });
    return data;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};
export const deleteTask = async (taskId: number) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

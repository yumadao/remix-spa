import {
  ClientActionFunctionArgs,
  ShouldRevalidateFunction,
  redirect,
} from "@remix-run/react";
import { AxiosError } from "axios";
import AuthForm from "~/components/authForm";
import { getCsrfToken, login, signup } from "~/utils/data";

export default function Auth() {
  return <AuthForm />;
}

export const clientLoader = async () => {
  await getCsrfToken();
  return null;
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return false;
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    if (formData.get("type") === "signup") {
      await signup({ email, password });
    }
    await login({ email, password });
    return redirect("/main");
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

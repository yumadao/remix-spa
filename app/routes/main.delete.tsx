import { ClientActionFunctionArgs } from "@remix-run/react";
import { AxiosError } from "axios";
import { deleteTask } from "~/utils/data";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const id = parseInt(formData.get("id") as string);
  try {
    await deleteTask(id);
    return null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

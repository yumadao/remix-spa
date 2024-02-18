import { redirect } from "@remix-run/node";
import { logout } from "~/utils/data";

export const clientAction = async () => {
  await logout();
  return redirect("/auth");
};

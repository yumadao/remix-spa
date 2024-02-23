import type { MetaFunction } from "@remix-run/node";
import { getCsrfToken } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return <></>;
}

export const clientLoader = async () => {
  await getCsrfToken();
  return null;
};

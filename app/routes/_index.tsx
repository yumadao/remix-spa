import { AppShell, Loader } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { getCsrfToken } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  // const { email } = useStore((state) => state);
  // const navigate = useNavigate();

  // if (email === undefined) {
  //   navigate("/auth");
  // } else {
  //   navigate("/about");
  // }

  return (
    <>
      <AppShell header={{ height: { base: 48, sm: 60, lg: 76 } }}>
        <AppShell.Header>Header</AppShell.Header>
      </AppShell>
      <Loader color="blue" />
    </>
  );
}

export const clientLoader = async () => {
  await getCsrfToken();
  return null;
};

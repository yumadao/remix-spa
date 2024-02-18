import { Container, Group, Title, Button, Divider } from "@mantine/core";
import { Form, Outlet, redirect, useFetcher } from "@remix-run/react";
import { IconLogout } from "@tabler/icons-react";
import { getCsrfToken, logout } from "~/utils/data";

export default function MainLayout() {
  const fetcher = useFetcher();
  return (
    <Container size="lg">
      <Group
        align="center"
        justify="space-between"
        style={{ padding: "15px 0", border: "1px" }}
      >
        <div>
          <Title order={3}>Todo App</Title>
        </div>
        <fetcher.Form method="post">
          <Button type="submit">
            <IconLogout />
          </Button>
        </fetcher.Form>
      </Group>
      <Divider mb={30} />
      <Outlet />
    </Container>
  );
}

export const clientLoader = async () => {
  await getCsrfToken();
  return null;
};

export const clientAction = async () => {
  await logout();
  return redirect("/auth");
};
